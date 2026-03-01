"use client";

import ProductCard from "@/components/cards/ProductCard";
import useWishlist from "@/hooks/useWishlist";
import { useEffect, useState } from "react";
import WishlistSkeleton from "./WishlistSkeleton";
import NoWishlistProductFound from "./NoWishlistProductFound";
import WishlistContainer from "./WishlistContainer";
import { ProductType } from "@/types/product";

const WishlistPageContent = () => {
  const { wishlist, isHydrated } = useWishlist();
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    if (wishlist.length === 0) {
      setProducts([]);
      return;
    }

    const fetchWishlistProducts = async () => {
      try {
        const res = await fetch("/api/products/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: wishlist }),
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Failed to fetch wishlist products:", res.statusText);
          setProducts([]);
          return;
        }

        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch wishlist products.", error);
        setProducts([]);
      }
    };

    fetchWishlistProducts();
  }, [isHydrated, wishlist]);

  if (!isHydrated || products === null) {
    return <WishlistSkeleton />;
  }

  if (products.length === 0) {
    return <NoWishlistProductFound />;
  }

  return (
    <WishlistContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </WishlistContainer>
  );
};

export default WishlistPageContent;
