import { Textarea } from '@/components/ui/textarea/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

import type { Control, UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { TypeRequest } from '@/types/types';
import { FormField } from '../ui/form/form';
import { Button } from '../ui/button/button';
import { checkBodyFormat } from '@/utils/check-body-format';
import { useTranslation } from 'react-i18next';

interface TypePropsBodyEditor {
  register: UseFormRegister<TypeRequest>;
  control: Control<TypeRequest, unknown, TypeRequest>;
  valueBody: UseFormWatch<TypeRequest>;
}

function BodyEditor({ register, control, valueBody }: TypePropsBodyEditor) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center justify-between">
        <h1 className="mr-2">{t('restClient.body.title')}:</h1>
        <FormField
          control={control}
          name="typeTextarea"
          render={({ field }) => (
            <div className="flex">
              {field.value === 'JSON' && (
                <Button
                  className="mr-2.5"
                  type="button"
                  onClick={() =>
                    checkBodyFormat(field.value, valueBody('body'))
                  }
                >
                  {t('restClient.body.format')}
                </Button>
              )}
              <Select
                defaultValue="Text"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[130px] mr-2 mb-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Text">
                      {t('restClient.body.text')}
                    </SelectItem>
                    <SelectItem value="JSON">JSON</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
      <Textarea placeholder="Type your body" {...register('body')} />
    </div>
  );
}

export default BodyEditor;
