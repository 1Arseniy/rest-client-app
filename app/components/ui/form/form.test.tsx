import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './form';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

type TestFormData = {
  email: string;
};

function TestForm({ onSubmit }: { onSubmit?: (data: TestFormData) => void }) {
  const methods = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>
        <FormField
          control={methods.control}
          name="email"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} data-testid="email-input" />
              </FormControl>
              <FormDescription>Enter your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe('Form components', () => {
  it('renders form field and labels correctly', () => {
    render(<TestForm />);
    expect(screen.getByText('Email')).toHaveAttribute(
      'data-slot',
      'form-label'
    );
    expect(screen.getByTestId('email-input')).toHaveAttribute(
      'data-slot',
      'form-control'
    );
    expect(screen.getByText('Enter your email')).toHaveAttribute(
      'data-slot',
      'form-description'
    );
  });

  it('shows validation error message when input is empty and submitted', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toHaveAttribute(
      'data-slot',
      'form-message'
    );
  });

  it('does not show error message when input is valid', async () => {
    const handleSubmit = vi.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await screen.findByDisplayValue('test@example.com');
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledWith(
      { email: 'test@example.com' },
      expect.anything()
    );
  });

  it('applies aria attributes correctly on error', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByText('Submit'));

    const input = await screen.findByTestId('email-input');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
