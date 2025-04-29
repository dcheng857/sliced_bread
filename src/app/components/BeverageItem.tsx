import Image from "next/image";
import { Beverage } from "../types/beverages";

interface BeverageProps {
  beverage: Beverage;
  addToCart: (beverage: Beverage) => void;
}

export default function BeverageItem(props: BeverageProps) {
  const { beverage, addToCart } = props;

  return (
    <div
      key={beverage.id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={beverage.image}
          alt={beverage.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-6 flex flex-col justify-between grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {beverage.name}
          </h3>
          <p className="text-gray-600 mb-4">{beverage.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${beverage.price}
          </span>
          <button
            onClick={() => addToCart(beverage)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
