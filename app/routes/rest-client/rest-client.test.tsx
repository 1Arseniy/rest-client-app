import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';
import RestClient, { loader } from './rest-client';

vi.mock('@/components/private-route', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private-route">{children}</div>
  ),
}));

vi.mock('@/components/request-controls/index', () => ({
  default: ({
    data,
    codeSnippet,
  }: {
    data: { status: string };
    codeSnippet: string;
  }) => (
    <div data-testid="rest-client-form">
      <div>status: {data.status}</div>
      <div>snippet: {codeSnippet}</div>
    </div>
  ),
}));

vi.mock('@/services/firebase-admin', () => ({
  saveRequestHistoryServer: vi.fn(),
}));

vi.mock('@/components/ui/sonner/sonner', () => ({
  showSonner: vi.fn(),
}));

vi.mock('postman-code-generators', () => ({
  default: {
    convert: (
      lang: string,
      variant: string,
      req: object,
      opts: object,
      cb: (err: null | Error, snippet: string) => void
    ) => {
      cb(null, `snippet for ${lang}/${variant}`);
    },
  },
}));

vi.mock('postman-collection', () => ({
  default: {
    Request: class {
      constructor(cfg: object) {
        return cfg;
      }
    },
  },
}));

vi.mock('@/utils/to-base-64', () => ({
  returnToString: (val: string) => val,
  toBase64: (val: string) => Buffer.from(val).toString('base64'),
}));

describe('loader', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns res and snippet on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: () => Promise.resolve('{"foo":"bar"}'),
    }) as unknown as typeof fetch;

    const request = new Request(
      'https://host/path?language=curl/cURL&userId=user1'
    );

    const result = await loader({
      request,
      params: {
        method: 'GET',
        requestUrl: 'https://host/path',
        body: '',
      },
      context: {},
    });

    expect(result.res.status).toBe('200 OK');
    expect(result.res.data).toContain('foo');
    expect(result.snippet).toContain('snippet for curl/cURL');
  });

  it('returns error when fetch fails', async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error('Network error')) as unknown as typeof fetch;

    const request = new Request(
      'https://host/path?language=curl/cURL&userId=user1'
    );

    const result = await loader({
      request,
      params: {
        method: 'GET',
        requestUrl: 'https://host/path',
        body: '',
      },
      context: {},
    });

    expect(result.res.error).toBe('Network error');
    expect(result.res.responseStatusCode).toBe(0);
  });
});

describe('RestClient component', () => {
  it('renders PrivateRoute and RestClientForm', async () => {
    const loaderData = {
      res: {
        status: '200 OK',
        requestDuration: 123,
        responseStatusCode: 200,
        responseSize: 10,
        requestSize: 5,
        endpoint: '/test',
        data: '{"foo":"bar"}',
      },
      snippet: 'code snippet',
    };

    render(
      <Suspense fallback={<div>loading...</div>}>
        <RestClient loaderData={loaderData} params={{}} matches={[]} />
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByTestId('private-route')).toBeInTheDocument();
      expect(screen.getByTestId('rest-client-form')).toBeInTheDocument();
      expect(screen.getByText(/200 OK/)).toBeInTheDocument();
      expect(screen.getByText(/code snippet/)).toBeInTheDocument();
    });
  });
});
