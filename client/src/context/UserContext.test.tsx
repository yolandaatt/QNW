import { render, screen } from '@testing-library/react';
import { UserProvider, useUser } from '@/context/UserContext';
import userEvent from '@testing-library/user-event';

// Mockkomponent som använder contextet
const MockComponent = () => {
  const { isLoggedIn, name, login, logout, isAdmin } = useUser();

  return (
    <div>
      <p>{isLoggedIn ? `Inloggad som ${name} (${isAdmin ? 'Admin' : 'User'})` : 'Ej inloggad'}</p>

      {/* Vanlig användare */}
      <button onClick={() => login('Alice', 'dummy-token', false)}>Logga in</button>

      {/* Admin-test */}
      <button onClick={() => login('Bob', 'admin-token', true)}>Logga in som admin</button>

      <button onClick={logout}>Logga ut</button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('bör visa "Ej inloggad" som startläge', () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    expect(screen.getByText('Ej inloggad')).toBeInTheDocument();
  });

  it('loggar in en vanlig användare och sparar data', async () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    await userEvent.click(screen.getByText('Logga in'));

    expect(screen.getByText('Inloggad som Alice (User)')).toBeInTheDocument();

    expect(localStorage.getItem('token')).toBe('dummy-token');
    expect(localStorage.getItem('name')).toBe('Alice');
    expect(localStorage.getItem('isAdmin')).toBe('false');
  });

  it('loggar in en admin-användare och sparar data', async () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    await userEvent.click(screen.getByText('Logga in som admin'));

    expect(screen.getByText('Inloggad som Bob (Admin)')).toBeInTheDocument();

    expect(localStorage.getItem('token')).toBe('admin-token');
    expect(localStorage.getItem('name')).toBe('Bob');
    expect(localStorage.getItem('isAdmin')).toBe('true');
  });

  it('loggar ut och rensar data', async () => {
    // Sätt initial state
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('name', 'Alice');
    localStorage.setItem('isAdmin', 'false');

    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    // Logga in igen (för att trigga state i komponenten)
    await userEvent.click(screen.getByText('Logga in'));

    // Logga ut
    await userEvent.click(screen.getByText('Logga ut'));

    expect(screen.getByText('Ej inloggad')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('isAdmin')).toBeNull();
  });
});
