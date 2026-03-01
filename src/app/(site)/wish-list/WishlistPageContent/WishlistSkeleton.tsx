import ProductCardSkeleton from "@/components/cards/ProductCard/ProductCardSkeleton";
import WishlistContainer from "./WishlistContainer";

const WishlistSkeleton = () => {
  return (
    <WishlistContainer>
      {[...Array(6)].map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </WishlistContainer>
  );
};

export default WishlistSkeleton;