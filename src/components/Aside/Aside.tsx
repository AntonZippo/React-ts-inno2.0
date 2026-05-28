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
    <aside className="w-64 p-4 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white text-gray-800 max-lg:w-full ">
      <h3 className="font-semibold text-gray-600 mb-2">CATEGORIES</h3>
      <div className="flex flex-col gap-1 mb-4 max-lg:flex-row max-lg:flex-wrap">
        <button
          onClick={() => onSelectCategory("all")}
          className={`text-left px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 ${
            selectedCategory === "all"
              ? "bg-zinc-600 text-white dark:bg-gray-800"
              : "hover:bg-gray-300 dark:hover:bg-gray-700  duration-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-left px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 ${
              selectedCategory === cat
                ? "bg-zinc-600 text-white dark:bg-gray-800"
                : "hover:bg-gray-300 dark:hover:bg-gray-700 duration-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4 flex fl font-medium ">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 mr-1 border border-gray-300 bg-white text-sm rounded focus:outline-blue-400 dark:text-black dark:placeholder:text-gray-800"
        />
        <div className="flex gap-1">
          <button
            onClick={onSearchSubmit}
            className="bg-cyan-700 text-white  hover:bg-blue-500 px-3 py-1 rounded text-sm cursor-pointer "
          >
            🔍
          </button>
          {searchInput && (
            <button
              onClick={clearSearch}
              className="text-sm text-black bg-gray-300 px-3 py-1 rounded cursor-pointer hover:text-white hover:bg-red-500"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleApplyFilters}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Min Price
            </label>
            <input
              type="text"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:text-gray-800 dark:bg-gray-100 text-sm focus:outline-blue-400"
              placeholder="Min price"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Max Price
            </label>
            <input
              type="text"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-100 dark:text-gray-800 text-sm focus:outline-blue-400"
              placeholder="Max price"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm dark:text-gray-300 text-gray-600">
            Min rating: {tempMinRating}★
          </label>
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

        <div className="flex flex-row w-full gap-2">
          <button
            type="submit"
            className=" flex-1 bg-cyan-700 hover:bg-blue-500 cursor-pointer text-white px-3 py-1 rounded text-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className=" flex-1 bg-white text-gray-800 px-3 py-1 rounded text-sm  hover:text-white hover:bg-red-500 cursor-pointer"
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
