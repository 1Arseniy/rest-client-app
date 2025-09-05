import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import WelcomePanel from '@/components/welcome-panel/index';

import '@testing-library/jest-dom/vitest';

import { MemoryRouter } from 'react-router';

const paths = ['/sign-in', '/sign-up'];

describe('tests WelcomePanel', () => {
  it('should show user "Welcome", Links: Sign In, Sign Up', () => {
    render(
      <MemoryRouter>
        <WelcomePanel />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    screen
      .getAllByRole('link')
      .forEach((link, i) => expect(link).toHaveAttribute('href', paths[i]));
  });
});
