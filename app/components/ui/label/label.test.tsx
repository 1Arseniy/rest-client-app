import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './label';
import '@testing-library/jest-dom';

describe('<Label />', () => {
  it('renders with text content', () => {
    render(<Label>My Label</Label>);
    const label = screen.getByText('My Label');

    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('label');
  });

  it('has data-slot="label"', () => {
    render(<Label>My Label</Label>);
    const label = screen.getByText('My Label');

    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Label</Label>);
    const label = screen.getByText('Label');

    expect(label).toHaveClass('custom-class');
  });

  it('links to input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="test-input">Email</Label>
        <input id="test-input" data-testid="input" />
      </>
    );

    const label = screen.getByText('Email');
    const input = screen.getByTestId('input');

    expect(label).toHaveAttribute('for', 'test-input');
    expect(label.htmlFor).toBe(input.id);
  });
});
