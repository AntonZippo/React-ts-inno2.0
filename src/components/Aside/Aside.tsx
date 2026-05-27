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
    <aside className="w-64 p-4 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white">
      <h3 className="font-bold mb-2">Categories</h3>
      <div className="flex flex-col gap-1 mb-4">
        <button
          onClick={() => onSelectCategory("all")}
          className={`text-left px-2 py-1 rounded ${
            selectedCategory === "all"
              ? "bg-gray-500 text-white dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
                ? "bg-gray-500 text-white dark:bg-gray-600"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
            className="bg-gray-500 text-white hover:bg-blue-500 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Search
          </button>
          {searchInput && (
            <button
              onClick={clearSearch}
              className="text-sm text-black bg-gray-300 px-3 py-1 rounded cursor-pointer hover:text-white hover:bg-red-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleApplyFilters}>
        <h3 className="font-bold mb-2">Price</h3>
        <div className="mb-2">
          <label className="block text-sm">Min: 0 $</label>
          <input
            aria-label="Minimal Price filter input"
            type="text"
            placeholder="Min price"
            value={tempMinPrice}
            onChange={(e) => setTempMinPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm ">Max: 10000 $</label>
          <input
            aria-label="Maximum Price filter input"
            type="text"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <h3 className="font-bold mb-2">Rating</h3>
        <div className="mb-4">
          <label className="block text-sm">Min rating: {tempMinRating}★</label>
          <input
            aria-label="Minimal Rating filter input"
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
            className="bg-gray-500 hover:bg-blue-500 cursor-pointer text-white px-3 py-1 rounded text-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm  hover:text-white hover:bg-red-500 cursor-pointer"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 dark:text-gray-300">
          Filters apply only to the current page.
        </p>
      </form>
    </aside>
  );
}

export default Aside;
