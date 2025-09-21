import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import History from '@/routes/history/index';
import '@testing-library/jest-dom/vitest';
import { createRoutesStub } from 'react-router';

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

describe('tests History', () => {
  const Stub = createRoutesStub([
    {
      path: '/history',
      Component: History,
    },
  ]);

  it('should show spinner ', () => {
    render(<Stub initialEntries={['/history']} />);
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
  });
});
