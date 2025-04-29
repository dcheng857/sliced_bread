export interface Beverage {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Beverage {
  quantity: number;
}
