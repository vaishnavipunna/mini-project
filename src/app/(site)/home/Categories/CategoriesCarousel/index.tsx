import CategoryCard from "./CategoryCard";
import Carousel from "@/components/ui/Carousel";
import CarouselItem from "@/components/ui/Carousel/CarouselItem";

const CategoriesCarousel = async () => {
  // Hardcoded categories for display (use existing local images)
  // Note: Use unique IDs (cat-1 through cat-4) to avoid conflicts with NewArrivals product IDs
  const categories = [
    {
      id: "cat-1",
      name: "Formal Gown",
      description: "Elegant formal gowns for special occasions",
      image: "/images/categories/formal-gown.jpg",
      slug: "formal-gown",
    },
    {
      id: "cat-2",
      name: "Maxi Dress",
      description: "Beautiful maxi dresses for elegant style",
      image: "/images/categories/maxi-dress.jpg",
      slug: "maxi-dress",
    },
    {
      id: "cat-3",
      name: "Cocktail Dress",
      description: "Chic cocktail dresses for evening events",
      image: "/images/categories/cocktail.jpg",
      slug: "cocktail-dress",
    },
    {
      id: "cat-4",
      name: "Seasonal Dress",
      description: "Trendy seasonal dresses for every occasion",
      image: "/images/home/banner/banner.png",
      slug: "seasonal-dress",
    },
  ];

  return (
    <Carousel>
      {categories.map((category) => (
        <div
          key={category.id}
          className="shrink-0 w-[68%] sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <CarouselItem>
            <CategoryCard category={category} />
          </CarouselItem>
        </div>
      ))}
    </Carousel>
  );
};

export default CategoriesCarousel;
