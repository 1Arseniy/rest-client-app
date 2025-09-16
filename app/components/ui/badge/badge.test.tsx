import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';
import '@testing-library/jest-dom';

describe('Badge component', () => {
  it('renders with default variant and tag', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge.tagName.toLowerCase()).toBe('span');
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-secondary');
  });

  it('applies additional className', () => {
    render(<Badge className="custom-class">With Custom Class</Badge>);
    const badge = screen.getByText('With Custom Class');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders with asChild as <a>', () => {
    render(
      <Badge asChild>
        <a href="/link">Link Badge</a>
      </Badge>
    );
    const badge = screen.getByText('Link Badge');
    expect(badge.tagName.toLowerCase()).toBe('a');
    expect(badge).toHaveAttribute('href', '/link');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });
});
