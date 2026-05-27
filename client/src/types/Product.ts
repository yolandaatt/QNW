export interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category?: string;
  stock: number;
  inStock?: boolean;
}
