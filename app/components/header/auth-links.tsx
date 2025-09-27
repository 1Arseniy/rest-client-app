import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router';

interface TypePropsAuthLinks {
  user: User | null | undefined;
  logOut: () => void;
}

function AuthLinks({ user, logOut }: TypePropsAuthLinks) {
  const { t } = useTranslation();

  return (
    <>
      {user ? (
        <div>
          <Link className="hover:underline mr-5" to="/">
            {t('auth.mainPage')}
          </Link>
          <Link onClick={logOut} className="hover:underline mr-5" to="/">
            {t('auth.signOut')}
          </Link>
        </div>
      ) : (
        <div>
          <Link className="hover:underline mr-5" to="/sign-in">
            {t('auth.signIn')}
          </Link>
          <Link className="hover:underline" to="/sign-up">
            {t('auth.signUp')}
          </Link>
        </div>
      )}
    </>
  );
}

export default AuthLinks;
