import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import Footer from '@/components/footer/index';

import '@testing-library/jest-dom/vitest';

const developers = [
  'https://github.com/1arseniy',
  'https://github.com/ksugaevskaya',
  'https://github.com/reginamos',
  'https://rs.school/courses/reactjs',
];

describe('tests Footer', () => {
  it('should show user gitHub, year, logo RSS', () => {
    render(<Footer />);
    screen
      .getAllByRole('link')
      .forEach((link, i) =>
        expect(link).toHaveAttribute('href', developers[i])
      );
    expect(screen.getByText('2025')).toBeInTheDocument();
  });
});
