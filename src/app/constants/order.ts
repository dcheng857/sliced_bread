import { CustomerInfo } from "../types/customer";

export const PRICE_DECIMAL_PLACES: number = 2;
export const COPY_MESSAGE_DURATION: number = 3000; // 3 seconds
export const initialCheckoutFormValues: CustomerInfo = {
  name: "",
  city: "",
  state: "",
  country: "",
};
export const ORDER_NUMBER_PREFIX: string = "ORD-";
export const TIMESTAMP_LENGTH: number = 6;
export const RANDOM_STRING_LENGTH: number = 4;
export const ORDER_NUMBER_CHARS: string =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
