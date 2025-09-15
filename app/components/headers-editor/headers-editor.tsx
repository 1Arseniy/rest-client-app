import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';

import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import type { TypeRequest } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface TypePropsHeadersEditor {
  register: UseFormRegister<TypeRequest>;
  append: UseFieldArrayAppend<TypeRequest, 'headers'>;
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<TypeRequest, 'headers', 'id'>[];
}

function HeadersEditor({
  register,
  append,
  remove,
  fields,
}: TypePropsHeadersEditor) {
  const { t } = useTranslation();
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[18px]">{t('restClient.headers.title')}:</h1>
        <Button
          type="button"
          className="cursor-pointer ml-2"
          onClick={() => append({ key: '', value: '' })}
        >
          {t('restClient.headers.addHeader')}
        </Button>
      </div>
      <div className="overflow-auto h-36 p-2.5">
        {fields.map((header, index) => (
          <div key={header.id} className="flex mb-5">
            <Input
              placeholder="Key"
              className="mr-2"
              {...register(`headers.${index}.key`)}
            />
            <Input
              placeholder="Value"
              {...register(`headers.${index}.value`)}
            />
            <Button
              type="button"
              className="cursor-pointer ml-2"
              onClick={() => remove(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeadersEditor;
