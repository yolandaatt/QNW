import { vi } from 'vitest';
import { UserProvider } from '@/context/UserContext';

const { mockPost } = vi.hoisted(() => ({
  mockPost: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/api/axios', () => ({
  default: {
    post: mockPost,
  },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form', () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lösenord/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logga in/i })).toBeInTheDocument();
  });

  it('shows error message on failed login', async () => {
    mockPost.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Felaktiga uppgifter' } },
    });

    render(
      <MemoryRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/lösenord/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /logga in/i }));

    await waitFor(() => {
      expect(screen.getByText(/felaktiga uppgifter/i)).toBeInTheDocument();
    });
  });

  it('redirects on successful login', async () => {
    mockPost.mockResolvedValueOnce({ data: { token: 'fake-jwt-token', role: 'admin' } });

    render(
      <MemoryRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/lösenord/i), { target: { value: 'securepassword' } });
    fireEvent.click(screen.getByRole('button', { name: /logga in/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/login', {
        email: 'admin@example.com',
        password: 'securepassword',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });
});
