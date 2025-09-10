import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';

import AboutDevelopers from '@/components/about-developers/index';

import '@testing-library/jest-dom/vitest';

import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';

describe('tests AboutDevelopers', () => {
  it('should show three cards with titles for developers and show title block', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutDevelopers />
      </I18nextProvider>
    );

    expect(screen.getByText('About the developers:')).toBeInTheDocument();
    expect(screen.getByText('Arseniy')).toBeInTheDocument();
    expect(screen.getByText('Regina')).toBeInTheDocument();
    expect(screen.getByText('Ksenia')).toBeInTheDocument();
  });

  it('should show three cards with descriptions for developers', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AboutDevelopers />
      </I18nextProvider>
    );
    expect(
      screen.getByText(
        'Frontend web developer, with over a year of commercial experience. She completed courses from RSS and knows how to create web applications on Vue, React, as well as Native TypeScript & JavaScript. And in life, she loves creativity and drawing'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'I’m a Frontend Engineer with a passion for crafting intuitive, high-quality user interfaces. A precise learner with a sharp eye for detail, loving solving complex problems, and seeing the immediate impact of well-executed code. I’m driven by the challenge of turning ideas into responsive, performant, and visually compelling applications.'
      )
    ).toBeInTheDocument();
  });
});
