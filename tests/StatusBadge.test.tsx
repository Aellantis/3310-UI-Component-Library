import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../src';

describe('StatusBadge', () => {
  it('renders published status correctly', () => {
    render(<StatusBadge status="published" />);
    expect(screen.getByText(/published/i)).toBeInTheDocument();
  });

  it('renders draft status correctly', () => {
    render(<StatusBadge status="draft" />);
    expect(screen.getByText(/draft/i)).toBeInTheDocument();
  });

  it('renders archived status correctly', () => {
    render(<StatusBadge status="archived" />);
    expect(screen.getByText(/archived/i)).toBeInTheDocument();
  });

  it('shows icon when showIcon is true', () => {
    render(<StatusBadge status="archived" showIcon />);
    const badge = screen.getByTestId('status-badge');
    expect(badge.textContent).toContain('Archived');
    expect(badge.textContent).toContain('●');
  });
});