import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home, { meta } from './home';

vi.mock('@/components/welcome-panel/index', () => ({
  default: () => <div data-testid="welcome-panel">WelcomePanel</div>,
}));
vi.mock('@/components/about-project', () => ({
  default: () => <div data-testid="about-project">AboutProject</div>,
}));
vi.mock('@/components/about-developers', () => ({
  default: () => <div data-testid="about-developers">AboutDevelopers</div>,
}));
vi.mock('@/components/about-rss-react', () => ({
  default: () => <div data-testid="about-rss-react">AboutRSSReact</div>,
}));

describe('Home component', () => {
  it('render without errors', () => {
    render(<Home />);
    expect(screen.getByTestId('welcome-panel')).toBeInTheDocument();
    expect(screen.getByTestId('about-project')).toBeInTheDocument();
    expect(screen.getByTestId('about-developers')).toBeInTheDocument();
    expect(screen.getByTestId('about-rss-react')).toBeInTheDocument();
  });

  it('function meta return correct data', () => {
    const metaData = meta();
    expect(metaData).toEqual([
      { title: 'New React Router App' },
      { name: 'description', content: 'Welcome to React Router!' },
    ]);
  });
});
