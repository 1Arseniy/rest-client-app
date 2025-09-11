import { Spinner } from '@/components/ui/spinner';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/firebase';

import { useNavigate } from 'react-router';

import { useEffect, type PropsWithChildren } from 'react';

function PrivateRoute({ children }: PropsWithChildren) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate('/');
  }, [user, navigate]);

  if (loading) return <Spinner variant="bars" size={54} />;

  return <>{children}</>;
}

export default PrivateRoute;
