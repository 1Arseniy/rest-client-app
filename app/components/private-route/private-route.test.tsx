import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('react-router', () => {
  const actual = vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockedUseAuthState = useAuthState as unknown as ReturnType<typeof vi.fn>;
const mockedUseNavigate = useNavigate as unknown as ReturnType<typeof vi.fn>;

describe('PrivateRoute', () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseNavigate.mockReturnValue(navigateMock);
  });

  it('show spinner while loading', () => {
    mockedUseAuthState.mockReturnValue([null, true]);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Some content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('redirect to "/" if user is not auth', () => {
    mockedUseAuthState.mockReturnValue([null, false]);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Some content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('show children if user is auth', () => {
    mockedUseAuthState.mockReturnValue([{ uid: '123' }, false]);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Private content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });
});
