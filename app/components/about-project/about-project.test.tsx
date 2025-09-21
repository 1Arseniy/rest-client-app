import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import AboutProject from '@/components/about-project/index';
import { logos } from '@/components/about-project/index';

import '@testing-library/jest-dom/vitest';

import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';

describe('tests AboutProject', () => {
  it('should show title', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutProject />
      </I18nextProvider>
    );

    expect(screen.getByText('Some of the tools we used:')).toBeInTheDocument();
  });

  it('should show icons', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutProject />
      </I18nextProvider>
    );
    screen
      .getAllByRole('img')
      .forEach((img, i) => expect(img).toHaveAttribute('src', logos[i]));
  });
});
