import * as yup from 'yup';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';
import SignUp from './sign-up';

const mockedUseAuthState = useAuthState as unknown as ReturnType<typeof vi.fn>;

const mockedUseNavigate = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}));

vi.mock('../../services/firebase', () => {
  return {
    auth: {},
    registerWithEmailAndPassword: vi.fn().mockResolvedValue(true),
  };
});

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockedUseNavigate };
});

vi.mock('@/validation/validation', () => {
  const schemaSignup = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6).required('Password is required'),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password')])
      .required(),
  });

  return { makeSchemas: () => ({ schemaSignup }) };
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={ui} />
      </Routes>
    </MemoryRouter>
  );

describe('SignUp component tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders spinner when loading === true', () => {
    mockedUseAuthState.mockReturnValue([null, true]);
    renderWithRouter(<SignUp />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  it('renders form when loading === false', () => {
    mockedUseAuthState.mockReturnValue([null, false]);
    renderWithRouter(<SignUp />);
    expect(
      screen.getByRole('heading', { name: 'auth.signUp' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.name')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.password')).toBeInTheDocument();
    expect(
      screen.getByLabelText('form.labels.repeatPassword')
    ).toBeInTheDocument();
    const signUpButton = screen.getByRole('button', { name: 'auth.signUp' });
    expect(signUpButton).toBeDisabled();
  });

  it('shows validation errors if fields are empty on submit', async () => {
    mockedUseAuthState.mockReturnValue([null, false]);
    renderWithRouter(<SignUp />);
    fireEvent.click(screen.getByRole('button', { name: 'auth.signUp' }));
    await waitFor(() => {
      const errors = screen.getAllByTestId('fname-error');
      expect(errors.some((el) => el.textContent !== '')).toBe(true);
    });
  });

  it('navigates to home immediately if user already logged in', () => {
    const user = { uid: '123', email: 'test@example.com' } as User;
    mockedUseAuthState.mockReturnValue([user, false]);
    renderWithRouter(<SignUp />);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });
});
