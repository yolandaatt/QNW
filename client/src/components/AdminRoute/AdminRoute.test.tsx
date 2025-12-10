import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminRoute from './AdminRoute';

const mockNavigate = vi.fn();

// Mocka Navigate-komponenten från react-router-dom
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
        <AdminRoute>
          <div>Adminpanel</div>
        </AdminRoute>
      </MemoryRouter>
    );

  it('redirects to login if no token is present', () => {
    setup();
    expect(screen.getByText(/redirecting to \/login/i)).toBeInTheDocument();
  });

  it('redirects to home if token is present but role is not admin', () => {
    const payload = btoa(JSON.stringify({ role: 'user' }));
    const token = `header.${payload}.signature`;
    localStorage.setItem('token', token);

    setup();
    expect(screen.getByText(/redirecting to \//i)).toBeInTheDocument();
  });

  it('renders children if token is valid and role is admin', () => {
    const payload = btoa(JSON.stringify({ role: 'admin' }));
    const token = `header.${payload}.signature`;
    localStorage.setItem('token', token);

    setup();
    expect(screen.getByText('Adminpanel')).toBeInTheDocument();
  });

  it('redirects to login if token is malformed', () => {
    localStorage.setItem('token', 'invalid.token.here');

    setup();
    expect(screen.getByText(/redirecting to \/login/i)).toBeInTheDocument();
  });
});
