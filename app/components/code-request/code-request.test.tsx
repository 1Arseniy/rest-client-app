import { it, expect, describe, beforeEach, vi } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import CodeRequest from '@/components/code-request/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { useForm } from 'react-hook-form';
import type { TypeRequest } from '@/types/types';

describe('tests CodeRequest', () => {
  const { result } = renderHook(() => useForm<TypeRequest>());
  const mockFunc = vi.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <CodeRequest
            control={result.current.control}
            setSearch={mockFunc}
            codeSnippet="Some code"
          />
        </I18nextProvider>
      </MemoryRouter>
    );
  });
  it('should show title and select with programming languages and code', () => {
    expect(screen.getByText('Code snippet:')).toBeInTheDocument();
    expect(screen.getByText('curl / cURL')).toBeInTheDocument();
    expect(screen.getByText('Some code')).toBeInTheDocument();
  });
});
