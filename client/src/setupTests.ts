import { vi } from 'vitest';
import type { Product } from '@/types/Product';

const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'Äpple',
    price: 12.5,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Ett fräscht rött äpple.',
  },
  {
    _id: '2',
    title: 'Banan',
    price: 8.0,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'En söt gul banan.',
  },
  {
    _id: '3',
    title: 'Apelsin',
    price: 15.0,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'En saftig apelsin full av C-vitamin.',
  },
];

// Mocka fetch globalt så alla tester får produkter
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    } as Response)
  );
});
