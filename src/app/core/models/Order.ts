export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: Product;
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
