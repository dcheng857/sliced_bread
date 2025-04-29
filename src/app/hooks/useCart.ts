import { useState } from "react";
import { Beverage, CartItem } from "../types/beverages";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (beverage: Beverage): void => {
    setCart((prevCart) => {
      const existingItem: CartItem | undefined = prevCart.find(
        (item) => item.id === beverage.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === beverage.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...beverage, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: number): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number): void => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleCheckout = (): void => {
    setCart([]);
  };

  const calculateCartTotals = (): {
    totalItems: number;
    totalPrice: number;
  } => {
    const totalItems: number = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice: number = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return { totalItems, totalPrice };
  };

  return {
    cart,
    showCart,
    setShowCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    handleCheckout,
    calculateCartTotals,
  };
}
