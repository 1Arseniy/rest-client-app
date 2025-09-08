import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';
import { Input } from '@/components/ui/input/input';

function RequestControls() {
  return (
    <div className="flex w-full justify-center mb-5">
      <Select defaultValue="GET">
        <SelectTrigger className="w-[130px] mr-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>method</SelectLabel>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="HEAD">HEAD</SelectItem>
            <SelectItem value="OPTIONS">OPTIONS</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input className="w-[30vw]" type="text" placeholder="Enter URL..." />
    </div>
  );
}

export default RequestControls;
