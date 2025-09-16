import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input';
import '@testing-library/jest-dom';

describe('<Input />', () => {
  it('renders input element with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('applies the given type', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies additional className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('accepts user input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hello world' } });
    expect(input.value).toBe('Hello world');
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows invalid state with aria-invalid', () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
