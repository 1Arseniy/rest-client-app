import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './index';
import '@testing-library/jest-dom';

const getSpinnerByTitle = () => screen.getByTitle(/loading/i);

describe('<Spinner />', () => {
  it('renders default spinner (LoaderIcon)', () => {
    render(<Spinner data-testid="spinner" />);
    const el = screen.getByTestId('spinner');

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('animate-spin');
  });

  it('applies size and className props', () => {
    render(
      <Spinner
        variant="default"
        size={36}
        className="text-red-500"
        data-testid="custom"
      />
    );

    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('height', '36');
    expect(el).toHaveClass('text-red-500');
  });
});
