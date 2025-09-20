import { lazy } from 'react';
import PrivateRoute from '@/components/private-route';

const HistoryComponent = lazy(() => import('@/components/history/index'));

export default function History() {
  return (
    <PrivateRoute>
      <HistoryComponent />
    </PrivateRoute>
  );
}
