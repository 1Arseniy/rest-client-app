import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button.tagName.toLowerCase()).toBe('button');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('renders with custom variant and size', () => {
    render(<Button variant="outline" size="sm">Outline Small</Button>);
    const button = screen.getByText('Outline Small');

    expect(button).toHaveClass('border');
    expect(button).toHaveClass('h-8');
  });

  it('applies additional className', () => {
    render(<Button className="custom-class">With Class</Button>);
    const button = screen.getByText('With Class');

    expect(button).toHaveClass('custom-class');
  });

  it('renders with asChild (e.g. <a>)', () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>
    );
    const linkButton = screen.getByText('Link Button');

    expect(linkButton.tagName.toLowerCase()).toBe('a');
    expect(linkButton).toHaveAttribute('href', '/link');
    expect(linkButton).toHaveAttribute('data-slot', 'button');
  });

  it('respects disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
  });
});
