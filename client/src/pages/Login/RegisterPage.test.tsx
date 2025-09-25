import { vi } from 'vitest';

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
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders register form', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/namn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^lösenord$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bekräfta lösenord/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrera/i })).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/namn/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^lösenord$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/bekräfta lösenord/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrera/i }));

    expect(await screen.findByText(/lösenorden matchar inte/i)).toBeInTheDocument();
  });

  it('shows error message on failed register', async () => {
    mockPost.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Registrering misslyckades' } },
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/namn/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^lösenord$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/bekräfta lösenord/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrera/i }));

    expect(await screen.findByText(/registrering misslyckades/i)).toBeInTheDocument();
  });

  it('redirects on successful register', async () => {
    mockPost.mockResolvedValueOnce({ data: { token: 'fake-jwt-token' } });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/namn/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^lösenord$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/bekräfta lösenord/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrera/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/register', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
