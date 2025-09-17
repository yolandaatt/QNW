import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderar en huvudrubrik', () => {
    render(<App />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).not.toHaveTextContent(/^\s*$/);
  });
});
