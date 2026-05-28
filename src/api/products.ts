import { useQuery } from "@tanstack/react-query";
import { StaleTime } from "../app.config";

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  thumbnail: string;
  brand: string;
  stock: number;
  discountPercentage: number;
};

export const useProducts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["products", { limit, skip }],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );
      const data = await res.json();
      return data as { products: Product[]; total: number };
    },
    staleTime: StaleTime, // lifeTime of data , then it's expired and refetch
    // gcTime  (Garbage Collection Time) dellete unnessesary data after time
  });
};

export const useSearchProducts = (
  query: string,
  limit: number,
  skip: number,
) => {
  return useQuery({
    queryKey: ["search", { query, limit, skip }],
    queryFn: async () => {
      if (!query) return { products: [], total: 0 };
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
      );
      const data = await res.json();
      return data as { products: Product[]; total: number };
    },
    enabled: !!query, // if it's no querry , will not fetch ,   "!!" make any value to bool cos enabled wanted bool.
    staleTime: StaleTime,
  });
};

export const useProductsByCategory = (
  category: string,
  limit: number,
  skip: number,
) => {
  return useQuery({
    queryKey: ["category", { category, limit, skip }],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
      );
      const data = await res.json();
      return data as { products: Product[]; total: number };
    },
    enabled: !!category && category !== "all",
    staleTime: StaleTime,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      return data as string[];
    },
    staleTime: StaleTime,
  });
};

export const useProductById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      return data as Product;
    },
    enabled: !!id,
    staleTime: StaleTime,
  });
};
