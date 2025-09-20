import { lazy } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { getRequestHistoryServer } from '@/services/firebase-admin';
import PrivateRoute from '@/components/private-route';
import type { Route } from './+types';

const HistoryComponent = lazy(() => import('@/components/history/index'));

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return {
      requests: [],
      totalCount: 0,
      error: 'User not authenticated',
    };
  }

  try {
    const historyData = await getRequestHistoryServer(userId);
    return historyData;
  } catch (error) {
    console.error('Error loading request history:', error);
    return {
      requests: [],
      totalCount: 0,
      error: 'Failed to load history',
    };
  }
}

export default function History({ loaderData }: Route.ComponentProps) {
  return (
    <PrivateRoute>
      <HistoryComponent data={loaderData} />
    </PrivateRoute>
  );
}
