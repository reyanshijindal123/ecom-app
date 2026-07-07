import { Product, User } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProduct: async (id: number): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    return res.json();
  },

  // Auth (mock)
  login: async (username: string, password: string): Promise<{ token: string }> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  getUser: async (id: number): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },
};
