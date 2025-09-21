import { describe, it, vi, beforeEach, expect, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as router from 'react-router';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  const navigateMock = vi.fn();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    __navigateMock: navigateMock,
  };
});

const mockedUseAuthState = useAuthState as unknown as Mock;

type RouterWithMock = typeof router & {
  __navigateMock: Mock;
};

const navigateMock = (router as RouterWithMock).__navigateMock;

describe('PrivateRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
