import { Textarea } from '@/components/ui/textarea/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

function BodyEditor() {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center justify-between">
        <h1 className="mr-2">Body:</h1>
        <Select defaultValue="Text">
          <SelectTrigger className="w-[130px] mr-2 mb-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="JSON">JSON</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Textarea placeholder="Type your body" />
    </div>
  );
}

export default BodyEditor;
