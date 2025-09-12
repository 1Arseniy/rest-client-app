import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';

import type { UseFormRegister } from 'react-hook-form';
import type { TypeRequest } from '@/types/types';
import { useState } from 'react';

interface TypePropsHeadersEditor {
  register: UseFormRegister<TypeRequest>;
}

interface TypeStateHeadersEditor {
  key: string;
  value: string;
}

function HeadersEditor({ register }: TypePropsHeadersEditor) {
  const [headers, setHeaders] = useState<TypeStateHeadersEditor[]>([
    { key: '', value: '' },
  ]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[18px]">Headers:</h1>
        <Button
          type="button"
          className="cursor-pointer ml-2"
          onClick={addHeader}
        >
          Add Header
        </Button>
      </div>
      {headers.map((_, i) => (
        <div key={i} className="flex mb-5">
          <Input
            placeholder="Key"
            className="mr-2"
            {...register('header.key')}
          />
          <Input placeholder="Value" {...register('header.velue')} />
        </div>
      ))}
    </div>
  );
}

export default HeadersEditor;
