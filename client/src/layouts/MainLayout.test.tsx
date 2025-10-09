import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

// Mocka Header och Footer för enkel testning
vi.mock('@/components/Header/Header', () => ({
  default: () => <div>Mock Header</div>,
}));
vi.mock('@/components/Footer/Footer', () => ({
  default: () => <div>Mock Footer</div>,
}));

describe('MainLayout', () => {
  it('renderar Header, Footer och innehåll från Outlet', () => {
    render(
      <MemoryRouter>
        <MainLayout />
        <div>Sidinnehåll</div> {/* Simulerar Outlet */}
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
    expect(screen.getByText('Sidinnehåll')).toBeInTheDocument();
  });
});
