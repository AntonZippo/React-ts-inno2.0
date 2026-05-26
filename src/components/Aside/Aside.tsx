import { useState, useEffect } from "react";

interface AsideProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setMinRating: (value: number) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearchSubmit: () => void;
  clearSearch: () => void;
}

function Aside({
  categories,
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  minRating,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  searchInput,
  setSearchInput,
  onSearchSubmit,
  clearSearch,
}: AsideProps) {
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempMinRating, setTempMinRating] = useState(minRating);

  useEffect(() => {
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
    setTempMinRating(minRating);
  }, [minPrice, maxPrice, minRating]);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setMinRating(tempMinRating);
  };

  const handleResetFilters = () => {
    setTempMinPrice(0);
    setTempMaxPrice(10000);
    setTempMinRating(0);
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
  };

  return (
    <aside className="w-64 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Categories</h3>
      <div className="flex flex-col gap-1 mb-4">
        <button
          onClick={() => onSelectCategory("all")}
          className={`text-left px-2 py-1 rounded ${
            selectedCategory === "all"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-left px-2 py-1 rounded ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2 mt-1">
          <button
            onClick={onSearchSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Search
          </button>
          {searchInput && (
            <button onClick={clearSearch} className="text-sm text-red-500">
              Clear
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleApplyFilters}>
        <h3 className="font-bold mb-2">Price</h3>
        <div className="mb-2">
          <label className="block text-sm">Min: ${tempMinPrice}</label>
          <input
            type="range"
            //TODO change for text or make comfort range
            min="0"
            max="10000"
            value={tempMinPrice}
            onChange={(e) => setTempMinPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Max: ${tempMaxPrice}</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <h3 className="font-bold mb-2">Rating</h3>
        <div className="mb-4">
          <label className="block text-sm">Min rating: {tempMinRating}★</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={tempMinRating}
            onChange={(e) => setTempMinRating(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Filters apply only to the current page.
        </p>
      </form>
    </aside>
  );
}

export default Aside;
