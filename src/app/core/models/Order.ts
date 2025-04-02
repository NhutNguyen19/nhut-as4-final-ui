import { Product } from './Product';

export interface OrderItem {
  id: string;
  quantity: number;
  totalPrice: number;
  totalMoney: number;
  productName: Product;
}

export interface Order {
  id: string;
  checkIn: string;
  checkOut: string | null;
  orderDate: string;
  status: string;
  totalAmount: number;
  userId: string | null;
  orderItems: OrderItem[];
}
