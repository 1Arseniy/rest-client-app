import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './sign-up';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { registerWithEmailAndPassword } from '../../services/firebase';
import type { User } from 'firebase/auth';
import * as yup from 'yup';

type MockUseAuthStateReturn = [User | null, boolean, Error?];
const mockedUseAuthState =
  useAuthState as unknown as vi.Mock<MockUseAuthStateReturn>;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

vi.mock('../../services/firebase', () => ({
  auth: {},
  registerWithEmailAndPassword: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/validation/validation', () => {
  const schemaSignup = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required(),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Repeat password is required'),
  });

  return {
    makeSchemas: () => ({
      schemaSignup,
    }),
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('<SignUp />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders spinner when loading is true', () => {
    mockedUseAuthState.mockReturnValue([null, true]);

    renderWithRouter(<SignUp />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  it('renders form when loading is false', () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignUp />);
    expect(screen.getByText('auth.signUp')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.name')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.password')).toBeInTheDocument();
    expect(
      screen.getByLabelText('form.labels.repeatPassword')
    ).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty on submit', async () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignUp />);
    fireEvent.click(screen.getByRole('button', { name: 'auth.signUp' }));

    await waitFor(() => {
      expect(screen.getAllByTestId('fname-error')).toHaveLength(4);
    });
  });

  it('calls registerWithEmailAndPassword with correct data', async () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignUp />);

    fireEvent.input(screen.getByLabelText('form.labels.name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText('form.labels.email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.input(screen.getByLabelText('form.labels.password'), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByLabelText('form.labels.repeatPassword'), {
      target: { value: 'password123' },
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'auth.signUp' })
      ).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: 'auth.signUp' }));

    await waitFor(() => {
      expect(registerWithEmailAndPassword).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'password123'
      );
    });
  });
});
