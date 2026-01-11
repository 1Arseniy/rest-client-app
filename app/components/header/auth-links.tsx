import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { NavLink } from 'react-router';
import { Button } from '../ui/button/button';

interface TypePropsAuthLinks {
  user: User | null | undefined;
  logOut: () => void;
  scrollY: number;
}

function AuthLinks({ user, logOut, scrollY }: TypePropsAuthLinks) {
  const { t } = useTranslation();

  return (
    <>
      {user ? (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'border-b-2  mr-5'
                : 'hover:border-b-2 mr-5 max-md:border-b-2 max-md:border-b-transparent'
            }
            to="/"
          >
            {t('auth.mainPage')}
          </NavLink>
          <Button
            asChild
            className={`${scrollY && 'bg-white text-black transition duration-300 hover:bg-gray-100'}`}
          >
            <NavLink onClick={logOut} to="/">
              {t('auth.signOut')}
            </NavLink>
          </Button>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'border-b-2  mr-5'
                : 'hover:border-b-2 mr-5 max-md:border-b-2 max-md:border-b-transparent'
            }
            to="/sign-in"
          >
            {t('auth.signIn')}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'border-b-2  mr-5'
                : 'hover:border-b-2 mr-5 max-md:border-b-2 max-md:border-b-transparent'
            }
            to="/sign-up"
          >
            {t('auth.signUp')}
          </NavLink>
        </>
      )}
    </>
  );
}

export default AuthLinks;
