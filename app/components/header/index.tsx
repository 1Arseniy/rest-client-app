import { useState, useEffect } from 'react';

import { Link } from 'react-router';

import '@/components/header/header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/services/firebase';
import LanguageSelect from '../ui/select/LanguageSelect';

function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const changeScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', changeScroll);
    return () => window.removeEventListener('scroll', changeScroll);
  }, [setScrollY]);

  const [user] = useAuthState(auth);

  const handleClick = () => {
    logout();
  };

  return (
    <div
      className={`${scrollY && 'scroll'} header sticky top-0 left-0 flex justify-between items-center pt-2.5 pb-2.5 pr-4 pl-4`}
    >
      <header className="flex items-center gap-5">
        <Link to="/" className="font-semibold">
          Rest Client
        </Link>

        <LanguageSelect scrollY={scrollY} />
      </header>
      {user ? (
        <Link onClick={handleClick} className="hover:underline mr-5" to="/">
          Sign Out
        </Link>
      ) : (
        <div>
          <Link className="hover:underline mr-5" to="/sign-in">
            Sign In
          </Link>
          <Link className="hover:underline" to="/sign-up">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
