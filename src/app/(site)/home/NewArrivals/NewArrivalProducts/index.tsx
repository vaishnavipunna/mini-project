import ProductCard from "@/components/cards/ProductCard";

const NewArrivalProducts = async () => {
  // Hardcoded products for display
  const products = [
    {
      id: "1",
      name: "Short Frock Autumn",
      description:
        "A beautiful autumn-themed short frock with leaf patterns",
      price: 150,
      slug: "short-frock-autumn",
      category: "",
      image: "/images/newarrivals/autumn.jpg",
      rating: 4.8,
      reviews: 24,
      inStock: true,
    },
    {
      id: "2",
      name: "Short Kurthi ",
      description: "Modern short kurthi  style dress with urban flair",
      price: 120,
      slug: "short-kurthi",
      category: "",
      image: "/images/newarrivals/kurthi.jpg",
      rating: 4.6,
      reviews: 18,
      inStock: true,
    },
    {
      id: "3",
      name: "lehenga choli",
      description: "Sophisticated lehenga choli with intricate embroidery",
      price: 95,
      slug: "lehenga-choli",
      category: "",
      image: "/images/newarrivals/lehenga choli.jpg",
      rating: 4.7,
      reviews: 22,
      inStock: true,
    },
    {
      id: "4",
      name: "Kurta Sets",
      description: "Elegant kurta sets perfect for cooler weather",
      price: 110,
      slug: "kurta-sets",
      category: "",
      image: "/images/newarrivals/Kurta Sets.jpg",
      rating: 4.9,
      reviews: 31,
      inStock: true,
    },
  ];

  if (products.length === 0) {
    return <p>No product found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default NewArrivalProducts;
