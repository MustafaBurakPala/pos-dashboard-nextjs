export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Product {
  _id: string;

  name: string;
  price: number;
  category: string;

  image?: string;

  unit: string;
  stock: number;
}
