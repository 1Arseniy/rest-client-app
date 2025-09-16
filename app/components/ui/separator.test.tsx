import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from './separator';
import '@testing-library/jest-dom';

describe('<Separator />', () => {
  it('renders with default props', () => {
    render(<Separator />);
    const separator = screen.getByTestId('separator');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveAttribute('data-slot', 'separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders with vertical orientation', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('is decorative by default', () => {
    render(<Separator />);
    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveAttribute('role', 'separator');
  });

  it('applies custom class', () => {
    render(<Separator className="my-custom-class" />);
    const separator = screen.getByTestId('separator');

    expect(separator).toHaveClass('my-custom-class');
  });

  it('sets decorative attribute to false', () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('role', 'separator');
  });
});
