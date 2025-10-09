import { render, screen } from '@testing-library/react';
import { UserProvider, useUser } from '@/context/UserContext';
import userEvent from '@testing-library/user-event';

// Mockkomponent som använder contextet
const MockComponent = () => {
  const { isLoggedIn, name, login, logout } = useUser();

  return (
    <div>
      <p>{isLoggedIn ? `Inloggad som ${name}` : 'Ej inloggad'}</p>
      <button onClick={() => login('Alice', 'dummy-token')}>Logga in</button>
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

  it('loggar in och sparar data', async () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    await userEvent.click(screen.getByText('Logga in'));
    expect(screen.getByText('Inloggad som Alice')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('dummy-token');
    expect(localStorage.getItem('name')).toBe('Alice');
  });

  it('loggar ut och rensar data', async () => {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('name', 'Alice');

    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    await userEvent.click(screen.getByText('Logga in'));
    await userEvent.click(screen.getByText('Logga ut'));

    expect(screen.getByText('Ej inloggad')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
  });
});
