import type { Product } from '@/types/Product';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/products';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Product not found');
  }
  return res.json();
}
