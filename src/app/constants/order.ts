import { CustomerInfo } from "../types/customer";

export const PRICE_DECIMAL_PLACES: number = 2;
export const COPY_MESSAGE_DURATION: number = 3000; // 3 seconds
export const initialCheckoutFormValues: CustomerInfo = {
  name: "",
  city: "",
  state: "",
  country: "",
};
