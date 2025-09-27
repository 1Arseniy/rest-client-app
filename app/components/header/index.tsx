import { useState, useEffect } from 'react';

import { Link } from 'react-router';

import '@/components/header/header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@/services/firebase';
import LanguageSelect from '../ui/select/language-select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet/sheet';
import { Button } from '@/components/ui/button/button';
import AuthLinks from '@/components/header/auth-links';

function Header() {
  const [scrollY, setScrollY] = useState(0);
  // const [isOpen] = useState('closed');

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

  // const checkIsOpen = (e: MouseEvent<HTMLButtonElement>) => {
  //   console.log(e.currentTarget.dataset);
  // };

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
      <AuthLinks user={user} logOut={handleClick} />
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          {/* <SheetHeader> */}
          <AuthLinks user={user} logOut={handleClick} />
          {/* <span>a</span> */}
          {/* </SheetHeader> */}
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
