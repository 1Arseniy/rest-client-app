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

const developers = [
  {
    name: 'Arseniy',
    description:
      "Hello my name is Arseniy, I'm from Belarus, Gomel. In this app I make Login page, User profile page, partially Cart page. Also I helped Stanislav with Catalog page. I can confidently say that I learned a lot at rs-school",
    gitHub: developersLinks[0],
  },
  {
    name: 'Regina',
    description:
      'Frontend web developer, with over a year of commercial experience. She completed courses from RSS and knows how to create web applications on Vue, React, as well as Native TypeScript & JavaScript. And in life, she loves creativity and drawing',
    gitHub: developersLinks[2],
  },
  {
    name: 'Ksenia',
    description: 'some text',
    gitHub: developersLinks[1],
  },
];

function AboutDevelopers() {
  return (
    <div>
      <h1 className="text-3xl mb-2.5 text-center ">About the developers:</h1>
      <div className="flex flex-wrap justify-center">
        {developers.map((developer) => (
          <Card key={developer.name} className="max-w-sm m-2.5">
            <CardHeader>
              <CardTitle>{developer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{developer.description}</CardDescription>
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
