import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const mockNavigate = vi.fn();

// Mocka Navigate på samma sätt som i AdminRoute-testet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => {
      mockNavigate(to);
      return <div>Redirecting to {to}</div>;
    },
  };
});

describe('ProtectedRoute', () => {
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Privat sida</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

  it('redirects to login if no token is present', () => {
    setup();
    expect(screen.getByText(/redirecting to \/login/i)).toBeInTheDocument();
  });

  it('renders children if token is present', () => {
    const payload = btoa(JSON.stringify({ role: 'user' }));
    const token = `header.${payload}.signature`;
    localStorage.setItem('token', token);

    setup();
    expect(screen.getByText('Privat sida')).toBeInTheDocument();
  });
});
