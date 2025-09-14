import { useState } from 'react';

import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Form, FormField } from '@/components/ui/form/form';

import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { getData } from '@/services/get-data';

import { useTranslation } from 'react-i18next';
import ResponsePanel from '../response-panel';

import { toBase64, returnToString } from '@/utils/to-base-64';

import type { TypeResponse, TypeRequest } from '@/types/types';
import HeadersEditor from '../headers-editor/headers-editor';
import MethodsSelect from '../ui/select/methods-select';
import BodyEditor from '../body-editor';

function RequestControls() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { method, request, body } = useParams();
  const [searchParams] = useSearchParams();
  const query = new URLSearchParams();

  const [data, setData] = useState<TypeResponse>();

  const getHeaders = Array.from(searchParams.entries()).map(([key, value]) => ({
    key,
    value: returnToString(value.slice(0, value.length - 2)),
  }));

  const form = useForm<TypeRequest>({
    defaultValues: {
      method: method || 'GET',
      request: returnToString(
        request
          ? request
          : toBase64('https://jsonplaceholder.typicode.com/todos/')
      ),
      headers:
        getHeaders.length > 0
          ? getHeaders
          : [{ key: 'Content-Type', value: 'text/plain' }],
      typeTextarea: 'Text',
      body: returnToString(body ? body : ''),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'headers',
    control: form.control,
  });

  const onSubmit: SubmitHandler<TypeRequest> = async (data) => {
    const encodedRequest = toBase64(data.request);
    const encodeBody = toBase64(JSON.stringify(data.body));
    data.headers.forEach((el) => query.append(el.key, toBase64(el.value)));
    setData(
      await getData(
        data.method,
        data.request,
        data.headers,
        data.body,
        data.typeTextarea
      )
    );
    navigate(
      `/rest-client/${data.method}/${encodedRequest}/${encodeBody}?${query})}`
    );
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
                render={({ field }) => <MethodsSelect field={field} />}
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
            <HeadersEditor
              register={form.register}
              fields={fields}
              append={append}
              remove={remove}
            />
            <BodyEditor
              control={form.control}
              register={form.register}
              valueBody={form.watch}
            />
          </form>
        </Form>
      </div>
      <ResponsePanel
        status={data ? data.status : ''}
        data={data?.data ? data.data : ''}
        error={data?.error}
      />
    </div>
  );
}

export default RequestControls;
