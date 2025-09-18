import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Variables from './variables';
import useVariables from '@/hooks/useVariables';

interface VariableItem {
  variable: string;
  value: string;
}

vi.mock('@/hooks/useVariables', () => ({
  default: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Variables component tests', () => {
  let variables: VariableItem[];
  let setVariables: (...args: VariableItem[]) => void;

  beforeEach(() => {
    variables = [];
    setVariables = vi.fn();
    (useVariables as unknown as Mock).mockReturnValue([
      variables,
      setVariables,
    ]);
  });

  it('render component and elemenets of form', () => {
    render(<Variables />);
    expect(screen.getByLabelText('variables.variable')).toBeInTheDocument();
    expect(screen.getByLabelText('variables.value')).toBeInTheDocument();
    expect(screen.getByText('variables.add')).toBeInTheDocument();
  });

  it('show error if fields are empty', () => {
    render(<Variables />);
    fireEvent.click(screen.getByText('variables.add'));
    expect(screen.getByTestId('fname-error')).toHaveTextContent(
      'variables.errors.empty'
    );
  });

  it('add new variable with correct variables', () => {
    render(<Variables />);

    fireEvent.change(screen.getByLabelText('variables.variable'), {
      target: { value: 'var1' },
    });
    fireEvent.change(screen.getByLabelText('variables.value'), {
      target: { value: 'value1' },
    });

    fireEvent.click(screen.getByText('variables.add'));

    expect(setVariables).toHaveBeenCalledWith([
      { variable: 'var1', value: 'value1' },
    ]);
    expect(screen.getByLabelText('variables.variable')).toHaveValue('');
    expect(screen.getByLabelText('variables.value')).toHaveValue('');
  });

  it('show error with repeated name of variable', () => {
    variables = [{ variable: 'var1', value: 'value1' }];
    (useVariables as unknown as Mock).mockReturnValue([
      variables,
      setVariables,
    ]);

    render(<Variables />);

    fireEvent.change(screen.getByLabelText('variables.variable'), {
      target: { value: 'var1' },
    });
    fireEvent.change(screen.getByLabelText('variables.value'), {
      target: { value: 'value2' },
    });

    expect(screen.getByTestId('fname-error')).toHaveTextContent(
      'variables.errors.unique'
    );
  });

  it('delete current variable', () => {
    variables = [{ variable: 'var1', value: 'value1' }];
    (useVariables as unknown as Mock).mockReturnValue([
      variables,
      setVariables,
    ]);

    render(<Variables />);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);

    expect(setVariables).toHaveBeenCalledWith([]);
  });

  it('update current variable', () => {
    variables = [{ variable: 'var1', value: 'value1' }];
    (useVariables as unknown as Mock).mockReturnValue([
      variables,
      setVariables,
    ]);

    render(<Variables />);
    const input = screen.getByDisplayValue('var1') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'var1-updated' } });

    expect(setVariables).toHaveBeenCalledWith([
      { variable: 'var1-updated', value: 'value1' },
    ]);
  });

  it('update current value of variable', () => {
    variables = [{ variable: 'var1', value: 'value1' }];
    (useVariables as unknown as Mock).mockReturnValue([
      variables,
      setVariables,
    ]);

    render(<Variables />);
    const input = screen.getByDisplayValue('value1') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'value1-updated' } });

    expect(setVariables).toHaveBeenCalledWith([
      { variable: 'var1', value: 'value1-updated' },
    ]);
  });
});
