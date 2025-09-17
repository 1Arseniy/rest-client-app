import { lazy } from 'react';

import PrivateRoute from '@/components/private-route';
import type { LoaderFunctionArgs } from 'react-router';
import { returnToString } from '@/utils/to-base-64';
import type { Route } from './+types/rest-client';

const RestClientForm = lazy(
  () => import('@/components/request-controls/index')
);

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const { method, requestUrl, body } = params;

  const getHeaders = Array.from(searchParams.entries()).map(([key, value]) => ({
    key,
    value: returnToString(value),
  }));
  try {
    const response = await fetch(returnToString(requestUrl ? requestUrl : ''), {
      method,
      headers: getHeaders.reduce((acc: { [key: string]: string }, header) => {
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
    return { status: `${response.status} ${response.statusText}`, data };
  } catch (err) {
    if (err instanceof Error) {
      return { status: '', error: err.message };
    }
  }
  return { status: '' };
}

export default function RestClient({ loaderData }: Route.ComponentProps) {
  return (
    <PrivateRoute>
      <RestClientForm data={loaderData} />
    </PrivateRoute>
  );
}
