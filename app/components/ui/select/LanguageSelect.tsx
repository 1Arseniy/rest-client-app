import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';
import { useTranslation } from 'react-i18next';

type LanguageSelectProps = {
  scrollY: number;
};

export default function LanguageSelect({ scrollY }: LanguageSelectProps) {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onValueChange={(lng: "en" | "ru") => {
        i18n.changeLanguage(lng).catch(console.error);
      }}
    >
      <SelectTrigger
        className={`w-[80px] cursor-pointer ${scrollY ? 'text-white' : 'text-black'}`}
      >
        <SelectValue>{i18n.language.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className={`${scrollY ? 'text-white bg-black' : 'text-black bg-white'}`}
      >
        <SelectGroup>
          <SelectLabel>language</SelectLabel>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="ru">RU</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}