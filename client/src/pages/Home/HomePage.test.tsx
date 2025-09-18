import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('visar rubrik och introduktionstext', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/välkommen/i);

    expect(screen.getByText(/det här är startsidan/i)).toBeInTheDocument();
  });
});
