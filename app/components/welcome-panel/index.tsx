import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

function WelcomePanel() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <div className="mt-2.5">
      {!user ? (
        <>
          {' '}
          <h1 className="text-center text-3xl mb-2">
            {t('mainRoute.welcomePanel.welcome')}!
          </h1>
          <div className="text-center">
            <Link className="hover:underline mr-6" to="/sign-in">
              {t('auth.signIn')}
            </Link>
            <Link className="hover:underline" to="/sign-up">
              {t('auth.signUp')}
            </Link>
          </div>{' '}
        </>
      ) : (
        <h1 className="text-center text-3xl mb-2">
          {t('mainRoute.welcomePanel.welcomeBack')}, [{user.email}]!
        </h1>
      )}
    </div>
  );
}

export default WelcomePanel;
