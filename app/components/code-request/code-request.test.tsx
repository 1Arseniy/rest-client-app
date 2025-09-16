import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeRequest from '@/components/code-request/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

describe('tests CodeRequest', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <CodeRequest />
        </I18nextProvider>
      </MemoryRouter>
    );
  });
  it('should show title and select with programming languages', () => {
    expect(screen.getByText('Code snippet:')).toBeInTheDocument();
    expect(screen.getByText('curl')).toBeInTheDocument();
  });
});
