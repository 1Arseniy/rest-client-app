import { useState } from 'react';

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
import { Button } from '@/components/ui/button/button';
import { Form, FormField } from '@/components/ui/form/form';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { methods } from '@/config/methods';
import { getData } from '@/services/get-data';

import { useTranslation } from 'react-i18next';
import ResponsePanel from '../response-panel';

import { toBase64, returnToString } from '@/utils/to-base-64';

import type { TypeResponse, TypeRequest } from '@/types/types';
import HeadersEditor from '../headers-editor/headers-editor';

function RequestControls() {
  const { method, request } = useParams();
  const [data, setData] = useState<TypeResponse>();

  const form = useForm<TypeRequest>({
    defaultValues: {
      method: method || 'GET',
      request: returnToString(request ? request : ''),
    },
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<TypeRequest> = async (data) => {
    const encodedRequest = toBase64(data.request);
    console.log(data);
    setData(await getData(data.method, data.request));
    navigate(`/rest-client/${data.method}/${encodedRequest}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <h1 className="text-3xl mt-2 mb-5 text-center">{t('auth.restClient')}</h1>
      <div className="pt-11 pb-11 pl-5 pr-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center mb-5"
          >
            <div className="flex justify-between mb-5">
              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
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
                        <SelectLabel>
                          {t('restClient.request.method')}
                        </SelectLabel>
                        {methods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                {...form.register('request')}
                className="w-[30vw]"
                type="text"
                placeholder={t('restClient.request.url')}
              />
              <Button className="ml-2.5" type="submit">
                {t('restClient.request.send')}
              </Button>
            </div>
            <HeadersEditor register={form.register} />
          </form>
        </Form>
        <ResponsePanel
          status={data ? data.status : ''}
          data={data?.data ? data.data : ''}
          error={data?.error}
        />
      </div>
    </div>
  );
}

export default RequestControls;
