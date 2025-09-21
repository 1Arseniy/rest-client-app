import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import History from './index';
import type { RequestHistoryResponse } from '@/types/types';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/utils/to-base-64', () => ({
  toBase64: (val: string) => `base64(${val})`,
}));

vi.mock('./helpers', () => ({
  formatDuration: (val: number) => `${val}ms`,
  formatTimestamp: (val: string) => `formatted-${val}`,
  getMethodColor: (method: string) => `method-${method}`,
  getStatusColor: (status: number) => `status-${status}`,
}));

describe('History component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, '', '/?userId=123');
  });

  it('renders error state', () => {
    render(
      <MemoryRouter>
        <History
          data={{ requests: [], totalCount: 0, error: 'Something went wrong' }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('history.errorTitle')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('history.restClientButton')).toBeInTheDocument();
  });

  it('renders empty state when no requests', () => {
    render(
      <MemoryRouter>
        <History data={{ requests: [], totalCount: 0 }} />
      </MemoryRouter>
    );

    expect(screen.getByText('history.emptyTitle')).toBeInTheDocument();
    expect(screen.getByText('history.emptySubtitle')).toBeInTheDocument();
    expect(screen.getByText('history.restClientButton')).toBeInTheDocument();
  });

  it('renders request history items', () => {
    const mockData: RequestHistoryResponse = {
      totalCount: 1,
      requests: [
        {
          id: '1',
          userId: 'test-user',
          method: 'GET',
          url: 'https://api.example.com/data',
          endpoint: '/data',
          responseStatusCode: 200,
          requestDuration: 150,
          requestTimestamp: new Date('2023-01-01T12:00:00Z').getTime(),
          body: JSON.stringify({ foo: 'bar' }),
          headers: [{ key: 'Content-Type', value: 'application/json' }],
          typeTextarea: 'JSON',
          requestSize: 123,
          responseSize: 456,
          errorDetails: '',
        },
      ],
    };

    render(
      <MemoryRouter>
        <History data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('history.title')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(
      screen.getByText('https://api.example.com/data')
    ).toBeInTheDocument();
    expect(screen.getByText('/data')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('150ms')).toBeInTheDocument();
    expect(
      screen.getByText(`formatted-${mockData.requests[0].requestTimestamp}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/history.requestSize/)).toBeInTheDocument();
    expect(screen.getByText(/history.responseSize/)).toBeInTheDocument();
  });

  it('renders error details inside request item if present', () => {
    const mockData: RequestHistoryResponse = {
      totalCount: 1,
      requests: [
        {
          id: '2',
          userId: 'test-user',
          method: 'POST',
          url: 'https://api.example.com/error',
          endpoint: '/error',
          responseStatusCode: 500,
          requestDuration: 300,
          requestTimestamp: 1234567895855585,
          body: JSON.stringify({}),
          headers: [],
          typeTextarea: 'Text',
          requestSize: 50,
          responseSize: 0,
          errorDetails: 'Internal Server Error',
        },
      ],
    };

    render(
      <MemoryRouter>
        <History data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText(/history.error/)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/)).toBeInTheDocument();
  });
});
