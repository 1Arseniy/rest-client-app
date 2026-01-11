import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { makeSchemas } from '@/validation/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, logInWithEmailAndPassword } from '../../services/firebase';
import * as reactFirebaseHooksAuth from 'react-firebase-hooks/auth';
const { useAuthState } = reactFirebaseHooksAuth;
import { useEffect, useMemo } from 'react';
import { Spinner } from '@/components/ui/spinner';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { t, i18n } = useTranslation();

  const { schemaSignin } = useMemo(() => makeSchemas(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<SignInFormData>({
    resolver: yupResolver(schemaSignin),
    mode: 'onChange',
  });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);
  useEffect(() => {
    trigger();
  }, [i18n.language, trigger]);

  const onSubmit = (data: SignInFormData) => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  return loading ? (
    <Spinner variant="bars" size={54} data-testid="spinner" />
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-5 pb-5 pr-2.5 pl-2.5">
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
            placeholder={t('form.placeholders.email')}
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
            placeholder={t('form.placeholders.password')}
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
          onClick={handleSubmit(onSubmit)}
          variant="outline"
          className="w-full cursor-pointer"
        >
          {t('auth.signIn')}
        </Button>

        <Link to="/sign-up">
          <Button
            variant="link"
            className="cursor-pointer w-full text-center text-gray-500  whitespace-pre-line"
          >
            {t('signInRoute.linkToSignUp')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
