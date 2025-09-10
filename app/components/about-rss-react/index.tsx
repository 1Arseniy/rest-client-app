import { useTranslation } from 'react-i18next';

import reactRssLogo from '@/assets/images/react-rss.svg';

function AboutRSSReact() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-2.5 text-center">
        {t('mainRoute.aboutRSSReact.title')}:
      </h1>
      <a href="https://rs.school/courses/reactjs">
        <img className="size-50" src={reactRssLogo} />
      </a>
    </div>
  );
}

export default AboutRSSReact;
