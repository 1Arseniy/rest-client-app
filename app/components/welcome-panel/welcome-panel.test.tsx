import { it, expect, describe, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import WelcomePanel from '@/components/welcome-panel/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

vi.mock('react-firebase-hooks/auth', () => ({
  useIdToken: vi.fn(),
}));

import { useIdToken } from 'react-firebase-hooks/auth';

const pathsNoUser = ['/sign-in', '/sign-up'];
const pathsWithUser = [
  '/rest-client',
  '/history?userId=test-uid',
  '/variables',
];

describe('tests WelcomePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders welcome panel for guest (no user)', () => {
    (useIdToken as Mock).mockReturnValue([null]);

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <WelcomePanel />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(i18n.t('mainRoute.welcomePanel.welcome') + '!')
    ).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link, i) =>
      expect(link).toHaveAttribute('href', pathsNoUser[i])
    );
  });

  it('renders welcome panel for logged in user with displayName', () => {
    (useIdToken as Mock).mockReturnValue([
      { uid: 'test-uid', displayName: 'Test User' },
    ]);

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <WelcomePanel />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        `${i18n.t('mainRoute.welcomePanel.welcomeBack')}, Test User!`
      )
    ).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach((link, i) =>
      expect(link).toHaveAttribute('href', pathsWithUser[i])
    );
  });

  it('renders welcome panel for logged in user without displayName (guest)', () => {
    (useIdToken as Mock).mockReturnValue([{ uid: 'test-uid' }]);

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <WelcomePanel />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        `${i18n.t('mainRoute.welcomePanel.welcomeBack')}, ${i18n.t('auth.guest')}!`
      )
    ).toBeInTheDocument();
  });
});
