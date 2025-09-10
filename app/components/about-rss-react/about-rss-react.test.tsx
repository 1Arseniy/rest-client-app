import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import AboutRSSReact from '@/components/about-rss-react/index';

import '@testing-library/jest-dom/vitest';

import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';

describe('tests AboutRSSReact', () => {
  it('should show title', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutRSSReact />
      </I18nextProvider>
    );

    expect(screen.getByText('About RSS React course:')).toBeInTheDocument();
  });

  it('should show logo RSS', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutRSSReact />
      </I18nextProvider>
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
