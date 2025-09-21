import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
vi.mock('@/components/private-route', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="private-route">{children}</div>
    ),
  };
});

vi.mock('./variables', () => {
  return {
    default: () => <div data-testid="variables-page">Variables content</div>,
  };
});

import Variables from './index';

describe('Variables component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders PrivateRoute wrapper', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Variables />
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByTestId('private-route')).toBeInTheDocument();
    });
  });

  it('renders VariablesPage inside PrivateRoute', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Variables />
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByTestId('variables-page')).toBeInTheDocument();
    });

    const wrapper = screen.getByTestId('private-route');
    const page = screen.getByTestId('variables-page');

    expect(wrapper).toContainElement(page);
  });
});
