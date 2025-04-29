interface BeverageFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function BeverageFilter(props: BeverageFilterProps) {
  const { currentFilter, onFilterChange } = props;

  return (
    <div className="flex justify-center mb-8 space-x-4 text-sm">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-1 rounded-full ${
          currentFilter === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("hot")}
        className={`px-4 py-1 rounded-full ${
          currentFilter === "hot"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Hot Drinks
      </button>
      <button
        onClick={() => onFilterChange("cold")}
        className={`px-4 py-1 rounded-full ${
          currentFilter === "cold"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Cold Drinks
      </button>
    </div>
  );
}
