import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import WelcomePanel from '@/components/welcome-panel/index';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

const paths = ['/sign-in', '/sign-up'];

describe('tests WelcomePanel', () => {
  it('should show user "Welcome", Links: Sign In, Sign Up', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <WelcomePanel />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(i18n.t('mainRoute.welcomePanel.welcome') + '!')).toBeInTheDocument();

    screen.getAllByRole('link').forEach((link, i) =>
      expect(link).toHaveAttribute('href', paths[i])
    );
  });
});
