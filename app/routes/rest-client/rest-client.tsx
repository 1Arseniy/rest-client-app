import { lazy } from 'react';

import PrivateRoute from '@/components/private-route';
import type { LoaderFunctionArgs } from 'react-router';
import { returnToString } from '@/utils/to-base-64';
import { saveRequestHistoryServer } from '@/services/firebase-admin';
import type { Route } from './+types/rest-client';

const RestClientForm = lazy(
  () => import('@/components/request-controls/index')
);

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const { method, requestUrl, body } = params;
  const startTime = Date.now();

  const userId = searchParams.get('userId');

  const getHeaders = Array.from(searchParams.entries()).map(([key, value]) => ({
    key,
    value: returnToString(value),
  }));

  const requestHeaders = getHeaders.filter(
    (header) => header.key !== 'userId' && header.key !== 'typeTextarea'
  );

  try {
    const response = await fetch(returnToString(requestUrl ? requestUrl : ''), {
      method,
      headers: requestHeaders.reduce(
        (acc: { [key: string]: string }, header) => {
          acc[header.key] = header.value;
          return acc;
        },
        {}
      ),
      body:
        body && method !== 'GET' && method !== 'HEAD'
          ? returnToString(body)
          : null,
    });
    const endTime = Date.now();
    const duration = endTime - startTime;

    const responseText = await response.text();
    const responseSize = new Blob([responseText]).size;
    const requestBody =
      body && method !== 'GET' && method !== 'HEAD' ? returnToString(body) : '';
    const requestSize = new Blob([requestBody]).size;
    const endpoint = new URL(returnToString(requestUrl ? requestUrl : ''))
      .pathname;

    if (userId) {
      try {
        await saveRequestHistoryServer({
          userId,
          method: method || 'GET',
          url: returnToString(requestUrl ? requestUrl : ''),
          headers: requestHeaders,
          body: JSON.stringify(JSON.parse(requestBody || '{}'), null, 2),
          typeTextarea: 'Text',
          requestDuration: duration,
          responseStatusCode: response.status,
          requestTimestamp: Date.now() - duration,
          requestSize: requestSize,
          responseSize: responseSize,
          errorDetails: response.ok ? null : responseText,
          endpoint: endpoint,
        });
      } catch (historyError) {
        console.error('Failed to save request history:', historyError);
      }
    }

    if (!response.ok) {
      return {
        status: `${response.status} ${response.statusText}`,
        error: responseText,
        requestDuration: duration,
        responseStatusCode: response.status,
        responseSize: responseSize,
        requestSize: requestSize,
        endpoint: endpoint,
      };
    }

    let data;
    try {
      data = JSON.stringify(JSON.parse(responseText), null, 8);
    } catch {
      data = responseText;
    }

    return {
      status: `${response.status} ${response.statusText}`,
      data,
      requestDuration: duration,
      responseStatusCode: response.status,
      responseSize: responseSize,
      requestSize: requestSize,
      endpoint: endpoint,
    };
  } catch (err) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';

    const requestBody =
      body && method !== 'GET' && method !== 'HEAD' ? returnToString(body) : '';
    const requestSize = new Blob([requestBody]).size;
    const endpoint = requestUrl
      ? new URL(returnToString(requestUrl)).pathname
      : '';

    if (userId) {
      try {
        await saveRequestHistoryServer({
          userId,
          method: method || 'GET',
          url: returnToString(requestUrl ? requestUrl : ''),
          headers: requestHeaders,
          body: JSON.stringify(JSON.parse(requestBody || '{}'), null, 2),
          typeTextarea: 'Text',
          requestDuration: duration,
          responseStatusCode: 0,
          requestTimestamp: Date.now() - duration,
          requestSize: requestSize,
          responseSize: 0,
          errorDetails: errorMessage,
          endpoint: endpoint,
        });
      } catch (historyError) {
        console.error(
          'Failed to save request history for error:',
          historyError
        );
      }
    }

    return {
      status: '',
      error: errorMessage,
      requestDuration: duration,
      responseStatusCode: 0,
      responseSize: 0,
      requestSize: requestSize,
      endpoint: endpoint,
      errorDetails: errorMessage,
    };
  }
}

export default function RestClient({ loaderData }: Route.ComponentProps) {
  return (
    <PrivateRoute>
      <RestClientForm data={loaderData} />
    </PrivateRoute>
  );
}
