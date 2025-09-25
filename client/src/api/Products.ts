import type { Product } from '@/types/Product';
import api from '@/api/axios';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>('/products');
    return res.data;
  } catch {
    throw new Error('Failed to fetch products');
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  } catch {
    throw new Error('Product not found');
  }
}
