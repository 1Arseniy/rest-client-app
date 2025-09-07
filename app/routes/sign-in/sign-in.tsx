import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import { schemaSignin } from '@/validation/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SignIn() {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schemaSignin),
    mode: 'onChange',
  });

  const onSubmit = (data) => {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {t('auth.signIn')}
        </h2>

        <div className="mb-4">
          <Label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('form.labels.email')}
          </Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="Write your email"
            className="w-full"
          />

          <div
            className="mt-2 ml-2 mr-2 text-sm italic text-red-700"
            data-testid="fname-error"
          >
            {errors.email?.message}
          </div>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
              {t('form.labels.password')}
          </Label>
          <Input
            {...register('password')}
            id="password"
            type="password"
            placeholder="Write your password"
            className="w-full"
          />

          <div
            className="mt-2 ml-2 mr-2 italic text-sm text-red-700"
            data-testid="password-error"
          >
            {errors.password?.message}
          </div>
        </div>
          
        <Button
          disabled={!isValid}
          onClick={onSubmit}
          variant="outline"
          className="w-full"
        >
          {t('auth.signIn')}
        </Button>

        <Link to="/sign-up">
          <Button variant="link" className="w-full text-center text-gray-500">
            {t('signInRoute.linkToSignUp')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
