"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/types/product";

export interface ProductsResponse {
  products: ProductType[];
  pagination: {
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

const fetcher = (url: string): Promise<ProductsResponse> =>
  fetch(url).then((res) => res.json());

interface UseProductsProps {
  limit?: number;
}

const useProducts = ({ limit = 10 }: UseProductsProps = {}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);
  if (page) params.set("page", page);
  params.set("limit", limit.toString());

  const queryString = params.toString();
  const url = queryString ? `/api/products?${queryString}` : "/api/products";

  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  if (error) console.error("Error fetching products:", error);

  const refetchProducts = () => {
    mutate(undefined, { revalidate: true });
  };

  return {
    products: data?.products || [],
    pagination: data?.pagination || {
      totalItems: 0,
      totalPages: 0,
      page: 1,
      limit: 8,
    },

    isProductsLoading: isLoading,
    refetchProducts,
  };
};

export default useProducts;
