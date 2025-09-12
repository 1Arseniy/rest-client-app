import { lazy } from 'react';

import PrivateRoute from '@/components/private-route';

const VariablesPage = lazy(() => import('./variables'));

export default function Variables() {
  return (
    <PrivateRoute>
      <VariablesPage />
    </PrivateRoute>
  );
}
