import { lazy } from 'react';

import PrivateRoute from '@/components/private-route';

const RestClientForm = lazy(
  () => import('@/components/request-controls/index')
);

export default function RestClient() {
  return (
    <PrivateRoute>
      <RestClientForm />
    </PrivateRoute>
  );
}
