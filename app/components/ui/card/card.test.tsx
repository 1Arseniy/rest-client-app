import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from './card';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Card components', () => {
  it('renders <Card /> with children and className', () => {
    render(
      <Card className="custom-card">
        <div>Card Content</div>
      </Card>
    );
    const card = screen.getByText('Card Content').parentElement;
    expect(card).toHaveAttribute('data-slot', 'card');
    expect(card).toHaveClass('custom-card');
  });

  it('renders <CardHeader /> with data-slot and className', () => {
    render(<CardHeader className="header-class">Header</CardHeader>);
    const header = screen.getByText('Header');
    expect(header).toHaveAttribute('data-slot', 'card-header');
    expect(header).toHaveClass('header-class');
  });

  it('renders <CardTitle /> correctly', () => {
    render(<CardTitle className="title-class">Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toHaveAttribute('data-slot', 'card-title');
    expect(title).toHaveClass('title-class');
  });

  it('renders <CardDescription /> correctly', () => {
    render(<CardDescription className="desc-class">Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc).toHaveAttribute('data-slot', 'card-description');
    expect(desc).toHaveClass('desc-class');
  });

  it('renders <CardContent /> correctly', () => {
    render(<CardContent className="content-class">Content</CardContent>);
    const content = screen.getByText('Content');
    expect(content).toHaveAttribute('data-slot', 'card-content');
    expect(content).toHaveClass('content-class');
  });

  it('renders <CardFooter /> correctly', () => {
    render(<CardFooter className="footer-class">Footer</CardFooter>);
    const footer = screen.getByText('Footer');
    expect(footer).toHaveAttribute('data-slot', 'card-footer');
    expect(footer).toHaveClass('footer-class');
  });

  it('renders <CardAction /> correctly', () => {
    render(<CardAction className="action-class">Action</CardAction>);
    const action = screen.getByText('Action');
    expect(action).toHaveAttribute('data-slot', 'card-action');
    expect(action).toHaveClass('action-class');
  });
});
