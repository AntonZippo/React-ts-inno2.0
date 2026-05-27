import { useState, useEffect, useMemo } from "react";
import {
  useProducts,
  useSearchProducts,
  useProductsByCategory,
  useCategories,
} from "../api/products";
import Aside from "../components/Aside/Aside";
import CardList from "../components/CardList/CardList";
import type { Product } from "../api/products";
import { MaxPrice } from "../app.config";
import { MinPrice } from "../app.config";
import { MinRating } from "../app.config";
import { ProductsLimitOnPage } from "../app.config";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [maxPrice, setMaxPrice] = useState(MaxPrice);
  const [minPrice, setMinPrice] = useState(MinPrice);
  const [minRating, setMinRating] = useState(MinRating);
  const [page, setPage] = useState(1);

  const limit = ProductsLimitOnPage;
  const skip = (page - 1) * limit;

  const { data: allData, isLoading: allLoading } = useProducts(limit, skip);
  const { data: categoryData, isLoading: categoryLoading } =
    useProductsByCategory(selectedCategory, limit, skip);
  const { data: searchData, isLoading: searchLoading } = useSearchProducts(
    searchQuery,
    limit,
    skip,
  );
  const { data: categories = [] } = useCategories();

  let products: Product[] = [];
  let total = 0;

  if (searchQuery) {
    products = searchData?.products ?? [];
    total = searchData?.total ?? 0;
  } else if (selectedCategory !== "all") {
    products = categoryData?.products ?? [];
    total = categoryData?.total ?? 0;
  } else {
    products = allData?.products ?? [];
    total = allData?.total ?? 0;
  }

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.price >= minPrice && p.price <= maxPrice && p.rating >= minRating,
    );
  }, [products, minPrice, maxPrice, minRating]);

  const totalPages = Math.ceil(total / limit);
  const isLoading = allLoading || categoryLoading || searchLoading;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, minRating]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    clearSearch();
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div className="flex gap-6">
      <Aside
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minRating={minRating}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setMinRating={setMinRating}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        clearSearch={clearSearch}
      />

      <div className="flex-1">
        <CardList products={filteredProducts} isLoading={isLoading} />

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
            >
              ← Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
