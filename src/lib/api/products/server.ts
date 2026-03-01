import { ProductType } from "@/types/product";

// mirror the same mock products used by the API route
const mockProducts: ProductType[] = [
  {
    id: "1",
    name: "Short Frock Autumn",
    description: "A beautiful autumn-themed short frock with leaf patterns",
    price: 150,
    slug: "short-frock-autumn",
    category: "",
    image: "/images/dresses/short-frock-autumn.jpg",
  },
  {
    id: "2",
    name: "Short Kurthi",
    description: "Modern short kurthi style dress with urban flair",
    price: 120,
    slug: "short-kurthi",
    category: "",
    image: "/images/dresses/short-kurthi.jpg",
  },
  {
    id: "3",
    name: "Lehenga Choli",
    description: "Sophisticated lehenga choli with intricate embroidery",
    price: 95,
    slug: "lehenga-choli",
    category: "",
    image: "/images/dresses/lehenga-choli.jpg",
  },
  {
    id: "4",
    name: "Kurta Sets",
    description: "Elegant kurta sets perfect for cooler weather",
    price: 110,
    slug: "kurta-sets",
    category: "",
    image: "/images/dresses/kurta-sets.jpg",
  },
  {
    id: "cat-1",
    name: "Formal Gown",
    description: "Elegant formal gowns for special occasions",
    price: 180,
    slug: "formal-gown",
    category: "",
    image: "/images/categories/formal-gown.jpg",
  },
  {
    id: "cat-2",
    name: "Maxi Dress",
    description: "Beautiful maxi dresses for elegant style",
    price: 160,
    slug: "maxi-dress",
    category: "",
    image: "/images/categories/maxi-dress.jpg",
  },
  {
    id: "cat-3",
    name: "Cocktail Dress",
    description: "Chic cocktail dresses for evening events",
    price: 140,
    slug: "cocktail-dress",
    category: "",
    image: "/images/custom-dress/mannequin.png",
  },
  {
    id: "cat-4",
    name: "Seasonal Dress",
    description: "Trendy seasonal dresses for every occasion",
    price: 175,
    slug: "seasonal-dress",
    category: "",
    image: "/images/home/banner/banner.png",
  },
];

export const getLatestProducts = async () => {
  // return the first 8 for now
  return mockProducts.slice(0, 8);
};

export const getProductBySlug = async (slug: string) => {
  return mockProducts.find((p) => p.slug === slug) || null;
};

export const getProductById = async (productId: string) => {
  return mockProducts.find((p) => p.id === productId) || null;
};
