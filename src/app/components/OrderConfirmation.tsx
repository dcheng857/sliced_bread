"use client";

import Link from "next/link";
import { useState } from "react";
import {
  COPY_MESSAGE_DURATION,
  PRICE_DECIMAL_PLACES,
} from "../constants/order";
import { Order } from "../types/order";

interface OrderConfirmationProps {
  onClose: () => void;
  order: Order;
}

export default function OrderConfirmation(props: OrderConfirmationProps) {
  const { onClose, order } = props;
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const orderUrl: string = `${window.location.origin}/orders/${order.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(orderUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), COPY_MESSAGE_DURATION);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your order. Your order number is:
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-6">
            {order.orderNumber}
          </p>

          <div className="mb-6 text-left">
            <h3 className="font-semibold mb-2">Contact Information:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>Name</p>
                <p className="font-medium">{order.customerInfo.name}</p>
              </div>
              <div>
                <p>City</p>
                <p className="font-medium">{order.customerInfo.city}</p>
              </div>
              <div>
                <p>State/Province</p>
                <p className="font-medium">{order.customerInfo.state}</p>
              </div>
              <div>
                <p>Country</p>
                <p className="font-medium">{order.customerInfo.country}</p>
              </div>
            </div>
            <h3 className="border-t pt-2 mt-2 font-semibold mb-2">
              Order Summary:
            </h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    $
                    {(item.price * item.quantity).toFixed(PRICE_DECIMAL_PLACES)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${order.totalPrice.toFixed(PRICE_DECIMAL_PLACES)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Save this link to view your order details later:
            </p>
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={orderUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
              />
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href={`/orders/${order.id}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Order Details
            </Link>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
