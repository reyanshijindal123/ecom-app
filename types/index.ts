export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';

export interface FilterState {
  category: string;
  search: string;
  sort: SortOption;
  minPrice: number;
  maxPrice: number;
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'delivered' | 'processing' | 'shipped';
  address: Address;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}
