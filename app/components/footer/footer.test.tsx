import { it, expect, describe, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';

import Footer from '@/components/footer/index';

import { developers } from '@/config/developers';

import '@testing-library/jest-dom/vitest';

describe('tests Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should show user gitHub,', () => {
    screen
      .getAllByRole('link')
      .forEach((link, i) =>
        expect(link).toHaveAttribute('href', developers[i])
      );
  });

  it('should show user year and logo RSS', () => {
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getAllByRole('link')[3]).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
