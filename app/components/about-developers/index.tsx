import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';

import { developersLinks } from '@/config/developers';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const developers = [
  {
    keyName: 'nameArseniy',
    keyDescription: 'arseniy',
    gitHub: developersLinks[0],
  },
  {
    keyName: 'nameRegina',
    keyDescription: 'regina',
    gitHub: developersLinks[2],
  },
  {
    keyName: 'nameKsenia',
    keyDescription: 'ksenia',
    gitHub: developersLinks[1],
  },
];

function AboutDevelopers() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl mb-2.5 text-center">
        {t('mainRoute.aboutDevelopers.title')}:
      </h1>
      <div className="flex flex-wrap justify-center">
        {developers.map((developer) => (
          <Card
            key={developer.keyName}
            className="max-w-sm m-2.5 justify-between"
          >
            <CardHeader>
              <CardTitle>
                {t(`mainRoute.aboutDevelopers.${developer.keyName}`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t(`mainRoute.aboutDevelopers.${developer.keyDescription}`)}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <a className="m-1" href={developer.gitHub}>
                <FontAwesomeIcon size="2x" icon={faGithub} />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AboutDevelopers;
