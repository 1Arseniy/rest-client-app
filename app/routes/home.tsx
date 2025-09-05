import WelcomePanel from '@/components/welcome-panel/index';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <WelcomePanel />
    </div>
  );
}
