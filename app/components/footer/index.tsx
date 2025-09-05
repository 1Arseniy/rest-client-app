import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import rssLogo from '@/assets/images/rss-logo.svg';

import '@/components/Footer/Footer.css';

const developers = [
  'https://github.com/1arseniy',
  'https://github.com/ksugaevskaya',
  'https://github.com/reginamos',
];

function Footer() {
  return (
    <footer className="p-1 flex items-center justify-around footer">
      <div className="flex gap-1">
        {developers.map((developer) => (
          <a className="m-1" key={developer} href={developer}>
            <FontAwesomeIcon size="2x" icon={faGithub} />
          </a>
        ))}
      </div>
      <div>2025</div>
      <a href="https://rs.school/courses/reactjs">
        <img className="size-11" src={rssLogo} alt="rss-logo" />
      </a>
    </footer>
  );
}

export default Footer;
