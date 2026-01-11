import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { FormField } from '@/components/ui/form/form';

import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import * as reactFirebaseHooksAuth from 'react-firebase-hooks/auth';
const { useAuthState } = reactFirebaseHooksAuth;

import { useTranslation } from 'react-i18next';
import ResponsePanel from '../response-panel';

import { toBase64, returnToString } from '@/utils/to-base-64';
import { auth } from '@/services/firebase';

import type { TypeResponse, TypeRequest } from '@/types/types';
import HeadersEditor from '../headers-editor/headers-editor';
import MethodsSelect from '../ui/select/methods-select';
import BodyEditor from '../body-editor';
import CodeRequest from '../code-request';
import useVariables from '@/hooks/useVariables';
import getHeaders from '@/utils/getHeaders';

interface TypeRequestControls {
  data: TypeResponse;
  codeSnippet: string;
}

function RequestControls({ data, codeSnippet }: TypeRequestControls) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [variables] = useVariables();
  const [user] = useAuthState(auth);
  const { method, requestUrl, body } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const headers = getHeaders(searchParams);

  const query = new URLSearchParams();

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

  const form = useForm<TypeRequest>({
    defaultValues: {
      method: method || 'GET',
      request: returnToString(
        requestUrl
          ? requestUrl
          : toBase64('https://jsonplaceholder.typicode.com/todos/')
      ),
      headers:
        headers.length > 0
          ? headers.filter(
              (item) => item.key !== 'userId' && item.key !== 'typeTextarea'
            )
          : [{ key: 'Content-Type', value: 'text/plain' }],
      typeTextarea: searchParams.get('typeTextarea') || 'Text',
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
    const encodeBody = toBase64(JSON.stringify(replacedBody, null, 2));
    replacedHeaders.forEach((el) => query.append(el.key, toBase64(el.value)));
    query.append('language', toBase64(data.language));

    if (user) {
      query.append('userId', user.uid);
    }

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
            <Button
              className="ml-2.5"
              type="submit"
              disabled={!form.watch('request').length}
            >
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
            setValue={form.setValue}
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
