import { it, expect, describe, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeadersEditor from '@/components/headers-editor/headers-editor';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

describe('tests HeadersEditor', () => {
  const mockFunc = vi.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <HeadersEditor
            register={mockFunc}
            append={mockFunc}
            remove={mockFunc}
            fields={[
              {
                key: '',
                value: '',
                id: '',
              },
            ]}
          />
        </I18nextProvider>
      </MemoryRouter>
    );
  });
  it('should show header title and button - "add"', () => {
    expect(screen.getByText('Headers:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('should show inputs - "key", "value" and remove icon', () => {
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByTestId('removeBtn')).toBeInTheDocument();
  });
});
