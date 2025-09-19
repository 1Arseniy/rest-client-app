import { lazy } from 'react';

import PrivateRoute from '@/components/private-route';
import type { LoaderFunctionArgs } from 'react-router';
import { returnToString, toBase64 } from '@/utils/to-base-64';
import type { Route } from './+types/rest-client';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';
import { showSonner } from '@/components/ui/sonner/sonner';
import type { TypeHeader } from '@/types/types';

const RestClientForm = lazy(
  () => import('@/components/request-controls/index')
);

interface TypeRequest {
  requestUrl: string | undefined;
  method: string | undefined;
  headers: TypeHeader[];
  body: string | undefined;
  language?: string[] | undefined;
}

async function getData({ method, requestUrl, headers, body }: TypeRequest) {
  try {
    const response = await fetch(returnToString(requestUrl ? requestUrl : ''), {
      method,
      headers: headers.reduce((acc: { [key: string]: string }, header) => {
        acc[header.key] = header.value;
        return acc;
      }, {}),
      body:
        body && method !== 'GET' && method !== 'HEAD'
          ? returnToString(body)
          : null,
    });
    if (!response.ok) {
      return {
        status: `${response.status} ${response.statusText}`,
        error: await response.text(),
      };
    }
    const data = JSON.stringify(await response.json(), null, 8);
    return {
      status: `${response.status} ${response.statusText}`,
      data,
    };
  } catch (err) {
    if (err instanceof Error) {
      return { status: '', error: err.message };
    }
  }
  return { status: '' };
}

async function generatorSnippet({
  method,
  requestUrl,
  headers,
  body,
  language,
}: TypeRequest) {
  const options = {
    indentCount: 3,
    indentType: 'Space',
  };
  const response = new sdk.Request({
    url: returnToString(requestUrl ? requestUrl : ''),
    method: method,
    header: headers.length
      ? headers
      : [{ key: 'Content-Type', value: 'text/plain' }],
    body: {
      mode: 'raw',
      raw:
        body && method !== 'GET' && method !== 'HEAD'
          ? returnToString(body)
          : null,
      options: {
        raw: { language: 'json' },
      },
    },
  });

  const snippet: string = await new Promise((res, rej) => {
    codegen.convert(
      language ? language[0].trim() : 'curl',
      language ? language[1].trim() : 'cURL',
      response,
      options,
      (error: unknown, snippet: string) => {
        if (error) {
          rej(error);
          showSonner('Error', '', 'error');
        } else {
          res(snippet);
        }
      }
    );
  });
  return snippet;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const language = returnToString(
    searchParams.get('language') || toBase64('curl / cURL')
  );

  const { method = 'GET', requestUrl, body } = params;
  const reverseToArr = language.toString().split('/');

  const getHeaders = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'language')
    .map(([key, value]) => ({
      key,
      value: returnToString(value),
    }));

  const [res, snippet] = await Promise.all([
    await getData({ requestUrl, method, headers: getHeaders, body }),
    await generatorSnippet({
      requestUrl,
      method,
      headers: getHeaders,
      body,
      language: reverseToArr,
    }),
  ]);
  return { res, snippet };
}

export default function RestClient({ loaderData }: Route.ComponentProps) {
  const { res, snippet } = loaderData;

  return (
    <PrivateRoute>
      <RestClientForm data={res} codeSnippet={snippet} />
    </PrivateRoute>
  );
}
