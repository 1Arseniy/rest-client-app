import logoEslint from '@/assets/images/project-tools/eslint.svg';
import logPrettier from '@/assets/images/project-tools/prettier.svg';
import logoReactRouter from '@/assets/images/project-tools/react-router.svg';
import logoReact from '@/assets/images/project-tools/react.svg';
import logoShadcn from '@/assets/images/project-tools/shadcn.svg';
import logoTawlind from '@/assets/images/project-tools/tawlind.svg';
import logoTS from '@/assets/images/project-tools/typescript.svg';
import logoVite from '@/assets/images/project-tools/vite.svg';
import { useTranslation } from 'react-i18next';

export const logos = [
  logoEslint,
  logPrettier,
  logoReactRouter,
  logoReact,
  logoShadcn,
  logoTawlind,
  logoTS,
  logoVite,
];

function AboutProject() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-3xl mb-2.5">
        {t('mainRoute.aboutProject')}:
      </h1>
      <div className="flex flex-wrap justify-center">
        {logos.map((logo) => (
          <img className="size-16 m-2" key={logo} src={logo} />
        ))}
      </div>
    </div>
  );
}

export default AboutProject;
