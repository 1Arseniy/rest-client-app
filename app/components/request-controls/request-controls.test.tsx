import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestControls from '@/components/request-controls/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const checkMethods = ['POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

describe('tests RequestControls', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <RequestControls />
        </I18nextProvider>
      </MemoryRouter>
    );
  });

  it('should show title', () => {
    expect(screen.getByText('Rest Client')).toBeInTheDocument();
  });

  it('should show select with url methods', () => {
    checkMethods.forEach((el) => {
      expect(screen.getByText(el)).toBeInTheDocument();
    });
  });

  it('should shoe button - "send"', () => {
    expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
  });
});
