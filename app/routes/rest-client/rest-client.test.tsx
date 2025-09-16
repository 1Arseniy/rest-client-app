import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClient from './rest-client';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

describe('tests RestClient', () => {
  it('should show spinner', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <RestClient />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
