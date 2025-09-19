import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { FormField } from '@/components/ui/form/form';

import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';

import { useTranslation } from 'react-i18next';
import ResponsePanel from '../response-panel';

import { toBase64, returnToString } from '@/utils/to-base-64';

import type { TypeResponse, TypeRequest } from '@/types/types';
import HeadersEditor from '../headers-editor/headers-editor';
import MethodsSelect from '../ui/select/methods-select';
import BodyEditor from '../body-editor';
import CodeRequest from '../code-request';
import useVariables from '@/hooks/useVariables';

interface TypeRequestControls {
  data: TypeResponse;
  codeSnippet: string;
}

function RequestControls({ data, codeSnippet }: TypeRequestControls) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [variables] = useVariables();
  const { method, requestUrl, body } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = new URLSearchParams();

  const getHeaders = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'language')
    .map(([key, value]) => ({
      key,
      value: returnToString(value),
    }));
    
  function replaceVariables(
    str: string,
    variables: { variable: string; value: string }[]
  ) {
    let result = str;
    for (let i = 0; i < variables.length; i++) {
      const { variable, value } = variables[i];
      if (result.includes(`{{${variable}}}`)) {
        result = result.replaceAll(`{{${variable}}}`, value);
      }
    }
    return result;
  }

  const getHeaders = Array.from(searchParams.entries()).map(([key, value]) => ({
    key,
    value: returnToString(value),
  }));

  const form = useForm<TypeRequest>({
    defaultValues: {
      method: method || 'GET',
      request: returnToString(
        requestUrl
          ? requestUrl
          : toBase64('https://jsonplaceholder.typicode.com/todos/')
      ),
      headers:
        getHeaders.length > 0
          ? getHeaders
          : [{ key: 'Content-Type', value: 'text/plain' }],
      typeTextarea: 'Text',
      body: returnToString(body ? body : ''),
      language: 'curl / cURL',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'headers',
    control: form.control,
  });

  const onSubmit: SubmitHandler<TypeRequest> = async (data) => {
    const url = replaceVariables(data.request, variables);

    const replacedHeaders = data.headers.map((header) => ({
      key: replaceVariables(header.key, variables),
      value: replaceVariables(header.value, variables),
    }));

    const bodyString =
      typeof data.body === 'string'
        ? data.body
        : JSON.stringify(data.body, null, 2);

    const replacedBody = replaceVariables(bodyString, variables);

    const encodedRequest = toBase64(url);
    const encodeBody = toBase64(replacedBody);
    
    replacedHeaders.forEach((el) => query.append(el.key, toBase64(el.value)));
    query.append('language', toBase64(data.language));

    navigate(
      `/rest-client/${data.method}/${encodedRequest}/${encodeBody}?${query}`
    );
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <h1 className="text-3xl mt-2 mb-5 text-center">{t('auth.restClient')}</h1>
      <div className="pt-11 pb-11 pl-5 pr-5">
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
          <CodeRequest
            control={form.control}
            codeSnippet={codeSnippet}
            setSearch={setSearchParams}
          />
        </form>
      </div>
      <ResponsePanel status={data.status} data={data.data} error={data.error} />
    </div>
  );
}

export default RequestControls;
