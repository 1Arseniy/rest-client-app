import { auth } from '@/services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

function WelcomePanel() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1 className="text-center text-3xl mb-2">
        {t('mainRoute.welcomePanel.welcome')}, {user?.displayName}!
      </h1>
      <div className="text-center">
        <Link className="hover:underline mr-2" to="/sign-in">
          {t('auth.signIn')}
        </Link>
        <Link className="hover:underline" to="/sign-up">
          {t('auth.signUp')}
        </Link>
      </div>
    </div>
  );
}

export default WelcomePanel;
