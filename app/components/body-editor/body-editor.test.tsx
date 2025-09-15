import { it, expect, describe, beforeEach, vi } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import BodyEditor from '@/components/body-editor/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { useForm } from 'react-hook-form';
import type { TypeRequest } from '@/types/types';

describe('tests BodyEditor', () => {
  const { result } = renderHook(() => useForm<TypeRequest>());
  const mockFunc = vi.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <BodyEditor
            register={mockFunc}
            valueBody={mockFunc}
            control={result.current.control}
          />
        </I18nextProvider>
      </MemoryRouter>
    );
  });
  it('should show title, select - "Text", textarea - "Type your body"', () => {
    expect(screen.getByText('Body:')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter request body')
    ).toBeInTheDocument();
  });
});
