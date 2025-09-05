import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import Header from '@/components/header/index';

import '@testing-library/jest-dom/vitest';

import { MemoryRouter } from 'react-router';

const paths = ['/', '/sign-in', '/sign-up'];

describe('tests Header', () => {
  it('should show user logo, language toggle, Links: Sign In, Sign Up', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('Rest Client')).toBeInTheDocument();
    screen
      .getAllByRole('link')
      .forEach((link, i) => expect(link).toHaveAttribute('href', paths[i]));
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
