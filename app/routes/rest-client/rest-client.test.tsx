import { it, describe } from 'vitest';
import { render } from '@testing-library/react';
import RestClient from './rest-client';
import '@testing-library/jest-dom/vitest';
import { createRoutesStub } from 'react-router';

describe('tests RestClient', () => {
  const Stub = createRoutesStub([
    {
      path: '/rest-client',
      Component: RestClient,
    },
  ]);

  it('should show spinner', async () => {
    render(<Stub initialEntries={['/rest-client']} />);
  });
});
