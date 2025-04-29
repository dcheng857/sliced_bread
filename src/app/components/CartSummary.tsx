import { PRICE_DECIMAL_PLACES } from "../constants/order";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary(props: CartSummaryProps) {
  const { totalPrice } = props;

  return (
    <div className="mt-6 pt-4 border-t">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Total:</span>
        <span className="text-xl font-bold">
          ${totalPrice.toFixed(PRICE_DECIMAL_PLACES)}
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Please the Order
      </button>
    </div>
  );
}
