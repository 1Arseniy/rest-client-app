import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';
import '@testing-library/jest-dom';

describe('<Textarea />', () => {
  it('renders the textarea element', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('data-slot', 'textarea');
  });

  it('applies className correctly', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('passes placeholder and value props', () => {
    render(<Textarea placeholder="Enter text" defaultValue="Hello" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toHaveValue('Hello');
  });

  it('respects disabled attribute', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('sets aria-invalid when passed', () => {
    render(<Textarea aria-invalid="true" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });
});
