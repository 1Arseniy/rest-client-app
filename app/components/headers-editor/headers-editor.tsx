import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';

function HeadersEditor() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[18px]">Headers:</h1>
        <Button className="cursor-pointer ml-2">Add Header</Button>
      </div>
      <div className="flex mb-5">
        <Input disabled={true} placeholder="Key" className="w-[100px] mr-2" />
        <Input disabled={true} placeholder="Value" className="w-[150px]" />
      </div>
    </div>
  );
}

export default HeadersEditor;
