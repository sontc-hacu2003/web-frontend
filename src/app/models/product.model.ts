export interface Product {
  name: string;
  price: number;
  was?: number;
  sale?: boolean;
  badge?: string;
  cat: string;
}

export interface CartItem {
  name: string;
  meta: string;
  price: number;
  qty: number;
}
