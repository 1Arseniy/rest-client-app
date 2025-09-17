import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClient from './rest-client';
import '@testing-library/jest-dom/vitest';
import { createRoutesStub } from 'react-router';

describe('tests RestClient', () => {
  const Stub = createRoutesStub([
    {
      path: '/rest-client',
      Component: RestClient,
      action() {},
    },
  ]);

  it('should show spinner', () => {
    render(<Stub initialEntries={['/rest-client']} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
