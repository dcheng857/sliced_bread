"use client";

import { useState } from "react";
import BeverageFilter from "./components/BeverageFilter";
import BeverageItem from "./components/BeverageItem";
import CartOverlay from "./components/CartOverlay";
import { beverages } from "./data/beverages";
import { useCart } from "./hooks/useCart";
import { Beverage } from "./types/beverages";

export default function Home() {
  const [filter, setFilter] = useState<string>("all");
  const {
    cart,
    showCart,
    setShowCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    handleCheckout,
    calculateCartTotals,
  } = useCart();

  const filteredBeverages: Beverage[] =
    filter === "all"
      ? beverages
      : beverages.filter((beverage) => beverage.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Beverages
          </h1>
          <p className="text-xl text-gray-600">
            Discover our wide selection of delicious drinks
          </p>
        </div>

        <BeverageFilter currentFilter={filter} onFilterChange={setFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeverages.map((beverage) => (
            <BeverageItem
              key={beverage.id}
              beverage={beverage}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {showCart && (
        <CartOverlay
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          calculateCartTotals={calculateCartTotals}
        />
      )}
    </div>
  );
}
