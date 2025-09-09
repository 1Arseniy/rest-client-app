import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { schemaSignup } from '@/validation/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../services/firebase';
import { useEffect } from 'react';

type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
};

export default function SignUp() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schemaSignup),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const onSubmit = (data: SignUpFormData) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {t('auth.signUp')}
        </h2>

        <div className="mb-4">
          <Label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('form.labels.name')}
          </Label>
          <Input
            {...register('name')}
            id="name"
            placeholder={t('form.placeholders.name')}
            className="w-full"
          />
          <div
            className="mt-2 ml-2 mr-2 text-sm italic text-red-700"
            data-testid="fname-error"
          >
            {errors.name?.message}
          </div>
        </div>

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

        <div className="mb-4">
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
            className="mt-2 ml-2 mr-2 text-sm italic text-red-700"
            data-testid="fname-error"
          >
            {errors.password?.message}
          </div>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password-repeated"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('form.labels.repeatPassword')}
          </Label>
          <Input
            {...register('passwordRepeat')}
            id="passwordRepeat"
            type="password"
            placeholder={t('form.placeholders.repeatPassword')}
            className="w-full"
          />
          <div
            className="mt-2 ml-2 mr-2 text-sm italic text-red-700"
            data-testid="fname-error"
          >
            {errors.passwordRepeat?.message}
          </div>
        </div>
        <Button
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          variant="outline"
          className="w-full mb-2"
        >
          {t('auth.signUp')}
        </Button>
        <Link to="/sign-in">
          <Button variant="link" className="w-full text-center text-gray-500">
            {t('signUpRoute.linkToSignIn')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
