import { programmingLanguages } from '@/config/programming-languages';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

function CodeRequest() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="mr-2">Code:</h1>
        <Select defaultValue="curl">
          <SelectTrigger className="w-[170px] mr-2 mb-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {programmingLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div></div>
    </div>
  );
}

export default CodeRequest;
