export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  thumbNail?: string;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  userId: string;
}
export interface Item {
  product: Product;
}

export interface Items {
  message: string;
  products: Product[];
}
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}
