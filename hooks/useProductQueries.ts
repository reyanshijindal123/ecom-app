import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
    staleTime: 5 * 60 * 1000,
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    staleTime: 30 * 60 * 1000,
  });

export const useProductsByCategory = (category: string) =>
  useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
