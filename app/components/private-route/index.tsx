import { Spinner } from '@/components/ui/spinner';

import * as reactFirebaseHooksAuth from 'react-firebase-hooks/auth';
const { useAuthState } = reactFirebaseHooksAuth;

import { auth } from '@/services/firebase';

import { useNavigate } from 'react-router';

import { useEffect, type PropsWithChildren } from 'react';

function PrivateRoute({ children }: PropsWithChildren) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate('/');
  }, [user, navigate, loading]);

  if (loading)
    return <Spinner data-testid="spinner" variant="bars" size={54} />;

  return <>{children}</>;
}

export default PrivateRoute;
