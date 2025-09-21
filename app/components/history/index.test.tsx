import { it, expect, describe, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import History from '@/components/history/index';
import '@testing-library/jest-dom/vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { renderWithRouter } from '@/routes/sign-in/sign-in.test';

const mockedUseNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    MemoryRouter: actual.MemoryRouter,
    Routes: actual.Routes,
    Route: actual.Route,
    Link: actual.Link,
  };
});

describe('tests History', () => {
  beforeEach(() => {
    renderWithRouter(
      <I18nextProvider i18n={i18n}>
        <History
          data={{
            requests: [
              {
                id: 'sdddd',
                userId: '',
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/todos/',
                headers: [{ key: 'cscscsdcs', value: 'text/plain' }],
                body: 'some body',
                typeTextarea: '',
                requestDuration: 1,
                responseStatusCode: 2,
                requestTimestamp: 1,
                requestSize: 1,
                responseSize: 1,
                errorDetails: '',
                endpoint: '1',
              },
            ],
            totalCount: 1,
          }}
        />
      </I18nextProvider>
    );
  });

  it('should show title', () => {
    expect(screen.getByText('History Requests')).toBeInTheDocument();
  });

  it('should show request', () => {
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(
      screen.getByText('https://jsonplaceholder.typicode.com/todos/')
    ).toBeInTheDocument();
    expect(screen.getByText('Request: 1 bytes')).toBeInTheDocument();
    expect(screen.getByText('Response: 1 bytes')).toBeInTheDocument();
    expect(screen.getByText('01.01.1970, 03:00:00')).toBeInTheDocument();
  });
});
