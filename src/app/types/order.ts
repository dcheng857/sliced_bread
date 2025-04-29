import { CartItem } from "./beverages";
import { CustomerInfo } from "./customer";

export interface Order {
  id?: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  totalPrice: number;
  date: string;
}
