import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label/label';
import { Link, useNavigate } from 'react-router';
import { schemaSignin } from '@/validation/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, logInWithEmailAndPassword } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmit = (data: SignInFormData) => {
    logInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Sign In
        </h2>

        <div className="mb-4">
          <Label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Your email address
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
            Your password
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
          onClick={handleSubmit(onSubmit)}
          variant="outline"
          className="w-full"
        >
          Sign In
        </Button>

        <Link to="/sign-up">
          <Button variant="link" className="w-full text-center text-gray-500">
            Not registered yet? Then sign up!
          </Button>
        </Link>
      </div>
    </div>
  );
}
