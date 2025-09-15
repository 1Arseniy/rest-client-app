import { auth } from '@/services/firebase';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useIdToken } from 'react-firebase-hooks/auth';

function WelcomePanel() {
  const { t } = useTranslation();
  const [user] = useIdToken(auth);

  return (
    <div className="mt-2.5">
      {!user ? (
        <>
          <h1 className="text-center text-3xl mb-2">
            {t('mainRoute.welcomePanel.welcome')}!
          </h1>
          <div className="mt-10 text-center">
            <Link className="hover:underline mr-6" to="/sign-in">
              {t('auth.signIn')}
            </Link>
            <Link className="hover:underline" to="/sign-up">
              {t('auth.signUp')}
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl mb-2">
            {t('mainRoute.welcomePanel.welcomeBack')},{' '}
            {user?.displayName ?? t('auth.guest')}!
          </h1>
          <div className="mt-10 text-center">
            <Link className="hover:underline mr-4" to={'/rest-client'}>
              {t('auth.restClient')}
            </Link>
            <Link className="hover:underline mr-4" to={''}>
              {t('auth.history')}
            </Link>
            <Link className="hover:underline" to={'/variables'}>
              {t('auth.variables')}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePanel;
