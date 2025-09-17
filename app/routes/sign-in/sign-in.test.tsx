import * as yup from 'yup';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './sign-in';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logInWithEmailAndPassword } from '../../services/firebase';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import type { User } from 'firebase/auth';

type MockUseAuthStateReturn = [User | null, boolean, Error?];
const mockedUseAuthState = useAuthState as unknown as Mock;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

vi.mock('../../services/firebase', () => ({
  auth: {},
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

const mockedUseNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    MemoryRouter: actual.MemoryRouter,
    Routes: actual.Routes,
    Route: actual.Route,
    Link: actual.Link,
  };
});

vi.mock('@/validation/validation', () => {
  const schemaSignin = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return {
    makeSchemas: () => ({
      schemaSignin,
    }),
  };
});

const renderWithRouter = (
  ui: React.ReactElement,
  initialEntries: string[] = ['/']
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
         <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  );

describe('SignIn component tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseNavigate.mockClear();
  });

  it('show spinner, if loading === true', () => {
    mockedUseAuthState.mockReturnValue([null, true] as MockUseAuthStateReturn);

    renderWithRouter(<SignIn />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  it('render form, if loading === false', () => {
    mockedUseAuthState.mockReturnValue([null, false] as MockUseAuthStateReturn);

    renderWithRouter(<SignIn />);
    expect(
      screen.getByRole('heading', { name: 'auth.signIn' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.password')).toBeInTheDocument();

    const signInButton = screen.getByRole('button', { name: 'auth.signIn' });
    expect(signInButton).toBeDisabled();
  });

  it('login when form is valid and submitted', async () => {
    mockedUseAuthState.mockReturnValue([null, false] as MockUseAuthStateReturn);
    (logInWithEmailAndPassword as Mock).mockResolvedValueOnce({});

    renderWithRouter(<SignIn />);

    const emailInput = screen.getByLabelText(
      'form.labels.email'
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      'form.labels.password'
    ) as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: '12345678' } });

    const signInButton = await screen.findByRole('button', {
      name: 'auth.signIn',
    });
    expect(signInButton).not.toBeDisabled();
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        '12345678'
      );
    });
  });

  it('show error when empty form', async () => {
    mockedUseAuthState.mockReturnValue([null, false] as MockUseAuthStateReturn);

    renderWithRouter(<SignIn />);
    const [signInButton] = screen.getAllByRole('button', {
      name: 'auth.signIn',
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('fname-error')).toBeInTheDocument();
      expect(screen.getByTestId('password-error')).toBeInTheDocument();
    });
  });

  it('should navigate to home if user is logged in', () => {
    const user = { uid: '123', email: 'test@example.com' } as User;
    mockedUseAuthState.mockReturnValue([user, false] as MockUseAuthStateReturn);

    renderWithRouter(<SignIn />);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  it('should not navigate if loading', () => {
    mockedUseAuthState.mockReturnValue([null, true] as MockUseAuthStateReturn);

    renderWithRouter(<SignIn />);

    expect(mockedUseNavigate).not.toHaveBeenCalled();
  });
});
