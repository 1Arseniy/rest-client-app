import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

function WelcomePanel() {
  const { t } = useTranslation();

  return (
    <div className="">
      <h1 className="text-center text-3xl mb-2">
        {t('mainRoute.welcomePanel.welcome')}!
      </h1>
      <div className="text-center">
        <Link className="hover:underline mr-2" to="/sign-in">
          {t('auth.signIn')}
        </Link>
        <Link className="hover:underline" to="/sign-up">
          {t('auth.signUp')}
        </Link>
      </div>
      <div className="mt-10">
        <Link className="hover:underline mr-4" to={'/rest-client'}>
          {t('auth.restClient')}
        </Link>
        <Link className="hover:underline mr-4" to={''}>
          {t('auth.history')}
        </Link>
        <Link className="hover:underline" to={''}>
          {t('auth.variables')}
        </Link>
      </div>
    </div>
  );
}

export default WelcomePanel;
