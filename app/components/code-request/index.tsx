import { programmingLanguages } from '@/config/programming-languages';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/select';

import { useTranslation } from 'react-i18next';
import { FormField } from '../ui/form/form';
import type { Control } from 'react-hook-form';
import type { TypeRequest } from '@/types/types';
import { toBase64 } from '@/utils/to-base-64';
import { type SetURLSearchParams } from 'react-router';

interface TypePropsCodeRequest {
  control: Control<TypeRequest, unknown, TypeRequest>;
  codeSnippet: string;
  setSearch: SetURLSearchParams;
}

function CodeRequest({
  control,
  codeSnippet,
  setSearch,
}: TypePropsCodeRequest) {
  const { t } = useTranslation();

  const requestLanguage = (value: string) => {
    setSearch(`language=${toBase64(value)}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="mr-2">{t('restClient.code.title')}:</h1>
        <FormField
          control={control}
          name="language"
          render={({ field }) => (
            <>
              <Select
                defaultValue="curl / cURL"
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  requestLanguage(value);
                }}
              >
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
            </>
          )}
        />
      </div>
      <pre className="overflow-auto max-h-80 border-2 border-[#e5e5e5] rounded-md p-2.5">
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
}

export default CodeRequest;
