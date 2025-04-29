"use client";

import { CustomerDetails } from "@/app/components/orders/CustomerDetails";
import { LoadingSpinner } from "@/app/components/orders/LoadingSpinner";
import { OrderHeader } from "@/app/components/orders/OrderHeader";
import { OrderItems } from "@/app/components/orders/OrderItems";
import { OrderNotFound } from "@/app/components/orders/OrderNotFound";
import { OrderTotal } from "@/app/components/orders/OrderTotal";
import { Order } from "@/app/types/order";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchOrder = async (orderNumber: string): Promise<Order | null> => {
  const response = await fetch(`/api/orders/${orderNumber}`);

  if (!response.ok) {
    throw new Error("Order not found");
  }

  return response.json();
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId: string = params.orderNo as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setIsLoading(false);

        return;
      }

      try {
        const data = await fetchOrder(orderId);

        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (!orderId || error) {
    return <OrderNotFound />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <OrderHeader order={order} />
          <CustomerDetails customerInfo={order.customerInfo} />
          <OrderItems items={order.items} />
          <OrderTotal totalPrice={order.totalPrice} />
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
