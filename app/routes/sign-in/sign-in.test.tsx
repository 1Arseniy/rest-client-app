import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './sign-in';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logInWithEmailAndPassword } from '../../services/firebase';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import type { User } from 'firebase/auth';

type MockUseAuthStateReturn = [User | null, boolean, Error?];
const mockedUseAuthState = useAuthState as unknown as vi.Mock<MockUseAuthStateReturn>;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

vi.mock('../../services/firebase', () => ({
  auth: {},
  logInWithEmailAndPassword: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/validation/validation', () => ({
  makeSchemas: () => ({
    schemaSignin: {
      validate: () => ({}),
    },
  }),
}));

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('<SignIn />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('show spinner, if loading === true', () => {
    mockedUseAuthState.mockReturnValue([null, true]);

    renderWithRouter(<SignIn />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });

  it('render form, if loading === false', () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignIn />);

    expect(screen.getByText('auth.signIn')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.email')).toBeInTheDocument();
    expect(screen.getByLabelText('form.labels.password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'auth.signIn' })).toBeDisabled();
  });

  it('show error when empty form', async () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignIn />);
    const signInButton = screen.getByRole('button', { name: 'auth.signIn' });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('fname-error')).toBeInTheDocument();
      expect(screen.getByTestId('password-error')).toBeInTheDocument();
    });
  });

  it('login with valid data', async () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    renderWithRouter(<SignIn />);

    const emailInput = screen.getByLabelText('form.labels.email');
    const passwordInput = screen.getByLabelText('form.labels.password');

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'auth.signIn' })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: 'auth.signIn' }));

    await waitFor(() => {
      expect(logInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', '12345678');
    });
  });
});
