import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const { t } = useTranslation();

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
            id="name"
            type="email"
            placeholder="Write your name"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
           {t('form.labels.email')}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Write your email"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
             {t('form.labels.password')}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Write your password"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password-repeated"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('form.labels.repeatPassword')}
          </Label>
          <Input
            id="password-repeated"
            type="password"
            placeholder="Repeat your password"
            className="w-full"
          />
        </div>

        <Button variant="outline" className="w-full mb-2">
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
