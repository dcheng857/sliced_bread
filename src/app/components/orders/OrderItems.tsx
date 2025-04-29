import { PRICE_DECIMAL_PLACES } from "@/app/constants/order";
import { Order } from "@/app/data/mockOrders";
import Image from "next/image";

interface OrderItemsProps {
  items: Order["items"];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${item.price.toFixed(PRICE_DECIMAL_PLACES)}
              </p>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
