import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

type LanguageSelectProps = {
  scrollY: number;
};

export default function LanguageSelect({ scrollY }: LanguageSelectProps) {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeLanguage = (lng: 'en' | 'ru') => {
    setCurrentLanguage(lng);
    document.documentElement.lang = lng;
    i18n.changeLanguage(lng).catch(console.error);
  };

  if (!isClient) {
    return (
      <select
        value={currentLanguage}
        disabled
        className={`w-[80px] ${scrollY ? 'text-white' : 'text-black'}`}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    );
  }

  return (
    <Select
      value={currentLanguage}
      onValueChange={(lng: 'en' | 'ru') => changeLanguage(lng)}
    >
      <SelectTrigger
        className={`w-[80px] cursor-pointer ${scrollY ? 'text-white' : 'text-black'}`}
      >
        <SelectValue>{t('header.language')}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className={`${scrollY ? 'text-white bg-black' : 'text-black bg-white'}`}
      >
        <SelectGroup>
          <SelectLabel>{t('header.languageLabel')}</SelectLabel>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="ru">RU</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
