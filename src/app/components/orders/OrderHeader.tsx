import { Order } from "@/app/data/mockOrders";

interface OrderHeaderProps {
  order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const orderDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
        <p className="text-gray-600">Order #{order.orderNumber}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-600">Order Date</p>
        <p className="font-medium">{orderDate}</p>
      </div>
    </div>
  );
}
