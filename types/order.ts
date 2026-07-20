export type OrderStatus =
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  orderDate: string;
  estimatedDelivery: string;
  deliveredDate?: string;

  status: OrderStatus;

  paymentMethod: string;
  paymentStatus: "Paid" | "Pending";

  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };

  items: OrderItem[];
}
