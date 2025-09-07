import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageSelect from './LanguageSelect';
import '@testing-library/jest-dom/vitest';

const changeLanguageMock = vi.fn().mockResolvedValue(undefined);

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'header.language': 'Language',
        'header.languageLabel': 'Select language',
      };
      return map[key] ?? key;
    },
    i18n: {
      language: 'en',
      changeLanguage: changeLanguageMock,
    },
  }),
}));

describe('LanguageSelect', () => {
  it('should render custom Select after mounting (client-side)', async () => {
    render(<LanguageSelect scrollY={1} />);
    await waitFor(() => screen.getByText('Language'));
    const trigger = screen.getByText('Language');
    expect(trigger).toBeInTheDocument();
  });

  it('should call i18n.changeLanguage when selecting a new language', async () => {
    render(<LanguageSelect scrollY={0} />);
    await waitFor(() => screen.getByText('Language'));

    const trigger = screen.getByText('Language');
    fireEvent.click(trigger);
    const ruOption = screen.getByText('RU');
    fireEvent.click(ruOption);

    await waitFor(() => {
      expect(changeLanguageMock).toHaveBeenCalledWith('ru');
      expect(document.documentElement.lang).toBe('ru');
    });
  });
});
