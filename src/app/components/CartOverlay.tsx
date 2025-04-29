"use client";

import { useState } from "react";
import { CartItem } from "../types/beverages";
import { CustomerInfo } from "../types/customer";
import { Order } from "../types/order";
import CartItems from "./CartItems";
import CheckOutForm from "./CheckOutForm";
import OrderConfirmation from "./OrderConfirmation";

interface CartOverlayProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  calculateCartTotals: () => {
    totalItems: number;
    totalPrice: number;
  };
}

export default function CartOverlay(props: CartOverlayProps) {
  const {
    cart,
    onClose,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    calculateCartTotals,
  } = props;
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { totalItems, totalPrice } = calculateCartTotals();

  const getOrderData = (customerInfo: CustomerInfo): Order => {
    const newOrder = {
      customerInfo,
      items: cart,
      totalPrice,
      date: new Date().toISOString(),
    };

    return newOrder;
  };

  const handleCheckout = async (values: CustomerInfo) => {
    const newOrder: Order = getOrderData(values);

    try {
      const response: Response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const data = await response.json();

        newOrder.id = data.order.id;
        newOrder.orderNumber = data.order.orderNumber;

        setOrder(newOrder);

        setShowConfirmation(true);
        onCheckout(); // Clear cart
      } else {
        console.error("Failed to save order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleConfirmationClose = (): void => {
    setShowConfirmation(false);
    onClose();
  };

  if (showConfirmation && order) {
    return (
      <OrderConfirmation onClose={handleConfirmationClose} order={order} />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart ({totalItems} items)</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            <CartItems
              cart={cart}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />

            <CheckOutForm onSubmit={handleCheckout} totalPrice={totalPrice} />
          </>
        )}
      </div>
    </div>
  );
}
