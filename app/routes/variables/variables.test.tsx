import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Variables from './variables';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

type VariableItem = { variable: string; value: string };

describe('<Variables />', () => {
  let variablesState: VariableItem[];
  let setVariablesMock: vi.Mock;

  beforeEach(() => {
    setVariablesMock = vi.fn();
    variablesState = [];

    vi.mock('@/hooks/useVariables', () => ({
      default: () => [variablesState, setVariablesMock],
    }));
  });

  it('shows error when variable or value input is empty', () => {
    render(<Variables />);

    const addBtn = screen.getByText('variables.add');

    fireEvent.click(addBtn);

    expect(screen.getByTestId('fname-error')).toHaveTextContent(
      'variables.errors.empty'
    );
    expect(addBtn).toBeDisabled();
  });

  it('clears error and allows add when variable and value are filled and unique', () => {
    render(<Variables />);

    const variableInput = screen.getByLabelText('variables.variable');
    const valueInput = screen.getByLabelText('variables.value');
    const addBtn = screen.getByText('variables.add');

    fireEvent.change(variableInput, { target: { value: 'VAR1' } });
    fireEvent.change(valueInput, { target: { value: 'VALUE1' } });

    expect(screen.getByTestId('fname-error')).toHaveTextContent('');

    expect(addBtn).not.toBeDisabled();

    fireEvent.click(addBtn);

    expect(setVariablesMock).toHaveBeenCalledWith(
      expect.arrayContaining([{ variable: 'VAR1', value: 'VALUE1' }])
    );

    expect((variableInput as HTMLInputElement).value).toBe('');
    expect((valueInput as HTMLInputElement).value).toBe('');
  });

  it('shows uniqueness error if variable duplicates one from variables', () => {
    variablesState = [{ variable: 'EXISTING', value: 'some' }];
    setVariablesMock = vi.fn();

    vi.mock('@/hooks/useVariables', () => ({
      default: () => [variablesState, setVariablesMock],
    }));

    render(<Variables />);

    const variableInput = screen.getByLabelText('variables.variable');
    const valueInput = screen.getByLabelText('variables.value');
    const addBtn = screen.getByText('variables.add');

    fireEvent.change(variableInput, { target: { value: 'EXISTING' } });
    fireEvent.change(valueInput, { target: { value: 'VALUE2' } });

    expect(screen.getByTestId('fname-error')).toHaveTextContent(
      'variables.errors.unique'
    );
    expect(addBtn).toBeDisabled();
  });

  it('deletes a specific current variable item', () => {
    variablesState = [
      { variable: 'A', value: '1' },
      { variable: 'B', value: '2' },
    ];
    setVariablesMock = vi.fn();

    vi.mock('@/hooks/useVariables', () => ({
      default: () => [variablesState, setVariablesMock],
    }));

    render(<Variables />);

    const deleteButtons = screen.getAllByRole('button', { name: /trash/i });
    fireEvent.click(deleteButtons[0]);
    expect(setVariablesMock).toHaveBeenCalledWith(
      expect.not.arrayContaining([{ variable: 'A', value: '1' }])
    );
  });

  it('delete all clears variables and inputs', () => {
    variablesState = [{ variable: 'X', value: 'Y' }];
    setVariablesMock = vi.fn();

    vi.mock('@/hooks/useVariables', () => ({
      default: () => [variablesState, setVariablesMock],
    }));

    render(<Variables />);

    const deleteAllBtn =
      screen.getAllByRole('button', { name: /trash/i })[1] ||
      screen.getByText((text: string, element: HTMLElement | null) => {
        return element?.textContent === '' && element.querySelector('svg');
      });

    fireEvent.click(deleteAllBtn);

    expect(setVariablesMock).toHaveBeenCalledWith([]);
    const variableInput = screen.getByLabelText('variables.variable');
    const valueInput = screen.getByLabelText('variables.value');
    expect((variableInput as HTMLInputElement).value).toBe('');
    expect((valueInput as HTMLInputElement).value).toBe('');
  });
});
