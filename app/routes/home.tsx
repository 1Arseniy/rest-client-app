import WelcomePanel from '@/components/welcome-panel/index';
import AboutProject from '@/components/about-project';
import AboutDevelopers from '@/components/about-developers';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-gray-50">
      <WelcomePanel />
      <AboutProject />
      <AboutDevelopers />
    </div>
  );
}
