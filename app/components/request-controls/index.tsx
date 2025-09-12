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
import { Button } from '../ui/button/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Form, FormField } from '@/components/ui/form/form';
import { methods } from '@/config/methods';
import { useTranslation } from 'react-i18next';
import { getData } from '@/services/get-data';

import { toBase64, returnToString } from '@/utils/to-base-64';

interface TypeRequest {
  method: string;
  request: string;
}

function RequestControls() {
  const { method, request } = useParams();
  const form = useForm<TypeRequest>({
    defaultValues: {
      method: method,
      request: returnToString(request ? request : ''),
    },
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<TypeRequest> = async (data) => {
    const encodedRequest = toBase64(data.request);
    await getData(data.method, data.request);
    navigate(`/rest-client/${data.method}/${encodedRequest}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <h1 className="text-3xl mt-2 mb-5 text-center">{t('auth.restClient')}</h1>
      <div className="pt-11 pb-11 pl-5 pr-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full justify-center mb-5"
          >
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
          </form>
        </Form>
      </div>
    </div>
  );
}

export default RequestControls;
