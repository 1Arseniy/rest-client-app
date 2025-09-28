import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { Link, NavLink } from 'react-router';

interface TypePropsAuthLinks {
  user: User | null | undefined;
  logOut: () => void;
}

function AuthLinks({ user, logOut }: TypePropsAuthLinks) {
  const { t } = useTranslation();

  return (
    <>
      {user ? (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'border-b-2  mr-5' : 'border-b-0 hover:border-b-2 mr-5'
            }
            to="/"
          >
            {t('auth.mainPage')}
          </NavLink>
          <Link onClick={logOut} className="hover:underline mr-5" to="/">
            {t('auth.signOut')}
          </Link>
        </>
      ) : (
        <>
          <Link className="hover:underline mr-5" to="/sign-in">
            {t('auth.signIn')}
          </Link>
          <Link className="hover:underline" to="/sign-up">
            {t('auth.signUp')}
          </Link>
        </>
      )}
    </>
  );
}

export default AuthLinks;
