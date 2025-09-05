import { useState, useEffect } from 'react';

import { Link } from 'react-router';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

import '@/components/header/header.css';

function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const changeScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', changeScroll);
    return () => window.removeEventListener('scroll', changeScroll);
  }, [setScrollY]);

  return (
    <div
      className={`${scrollY && 'scroll'} header sticky top-0 left-0 flex justify-between items-center pt-2.5 pb-2.5 pr-4 pl-4`}
    >
      <div className="flex items-center gap-5">
        <Link to="/">Logo</Link>
        <Select defaultValue="En">
          <SelectTrigger
            className={`w-[80px] cursor-pointer ${scrollY ? 'text-white' : 'text-black'}`}
          >
            <SelectValue defaultValue="En" />
          </SelectTrigger>
          <SelectContent
            className={`${scrollY ? 'text-white bg-black' : 'text-black bg-white'}`}
          >
            <SelectGroup>
              <SelectLabel>language</SelectLabel>
              <SelectItem value="En">EN</SelectItem>
              <SelectItem value="Ru">RU</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Link className="hover:underline mr-5" to="/sign-in">
          Sign In
        </Link>
        <Link className="hover:underline" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;
