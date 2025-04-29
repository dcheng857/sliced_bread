import { PRICE_DECIMAL_PLACES } from "@/app/constants/order";

interface OrderTotalProps {
  totalPrice: number;
}

export function OrderTotal({ totalPrice }: OrderTotalProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total Amount</span>
        <span className="text-xl font-bold">
          ${totalPrice.toFixed(PRICE_DECIMAL_PLACES)}
        </span>
      </div>
    </div>
  );
}
