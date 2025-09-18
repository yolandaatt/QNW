import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderar en huvudrubrik', () => {
    render(<App />);
    expect(screen.getByText('Välkommen till QNW!')).toBeInTheDocument();
  });
});
