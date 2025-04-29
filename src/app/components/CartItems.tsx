import Image from "next/image";
import { CartItem } from "../types/beverages";

interface CartItemsProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartItems(props: CartItemsProps) {
  const { cart, onUpdateQuantity, onRemoveItem } = props;

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
          <div className="relative w-16 h-16">
            <Image
              src={item.image}
              alt={item.name}
              fill
              unoptimized
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
