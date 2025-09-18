import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

import { methods } from '@/config/methods';

import type { TypeRequest } from '@/types/types';
import type { ControllerRenderProps } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

interface TypePropsMethodsSelect {
  field: ControllerRenderProps<TypeRequest, 'method'>;
}

function MethodsSelect({ field }: TypePropsMethodsSelect) {
  const { t } = useTranslation();

  return (
    <>
      <Select
        value={field.value}
        onValueChange={field.onChange}
        defaultValue="GET"
      >
        <SelectTrigger className="w-[110px] mr-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('restClient.request.method')}</SelectLabel>
            {methods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default MethodsSelect;
