import { useState, useEffect } from 'react';

import { Link } from 'react-router';

import '@/components/header/header.css';
import * as reactFirebaseHooksAuth from 'react-firebase-hooks/auth';
const { useAuthState } = reactFirebaseHooksAuth;
import { auth, logout } from '@/services/firebase';
import LanguageSelect from '../ui/select/language-select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet/sheet';
import { Button } from '@/components/ui/button/button';
import AuthLinks from '@/components/header/auth-links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

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
      <div className="nav">
        <AuthLinks user={user} logOut={handleClick} scrollY={scrollY} />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <div className="burger-menu">
            <FontAwesomeIcon
              icon={faEllipsis}
              size="2xl"
              className={`${scrollY && 'text-white'} text-black  cursor-pointer`}
            />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="text-2xl flex flex-col justify-center h-full items-center gap-5">
            <AuthLinks user={user} logOut={handleClick} scrollY={scrollY} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Header;
