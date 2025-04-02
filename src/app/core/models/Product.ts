export interface Category {
  id: string;
  name?: string; // Optional, if needed for display
  description?: string; // Optional, if needed for display
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Category; // Replace categoryId with category object
}
