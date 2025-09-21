import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponsePanel from '@/components/response-panel/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

describe('tests ResponsePanel', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <ResponsePanel
            status="200"
            data='{"userId": 1,"id": 1,"title": "delectus aut autem","completed": false}'
            error=""
          />
        </I18nextProvider>
      </MemoryRouter>
    );
  });
  it('should show title, status, data', () => {
    expect(screen.getByText('Response:')).toBeInTheDocument();
    expect(screen.getByText('Status: 200')).toBeInTheDocument();
    expect(
      screen.getByText(
        '{"userId": 1,"id": 1,"title": "delectus aut autem","completed": false}'
      )
    ).toBeInTheDocument();
  });
});
