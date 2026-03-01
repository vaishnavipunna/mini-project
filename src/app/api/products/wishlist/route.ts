import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@/types/product";

// Mock wishlist products for display - must match NewArrivals & Categories
const mockWishlistProducts: ProductType[] = [
  // NewArrivals products
  {
    id: "1",
    name: "Short Frock Autumn",
    description: "A beautiful autumn-themed short frock with leaf patterns",
    price: 150,
    slug: "short-frock-autumn",
    category: "",
    image: "/images/newarrivals/autumn.jpg",
  },
  {
    id: "2",
    name: "Short Kurthi ",
    description: "Modern short kurthi  style dress with urban flair",
    price: 120,
    slug: "short-kurthi",
    category: "",
    image: "/images/newarrivals/kurthi.jpg",
  },
  {
    id: "3",
    name: "lehenga choli",
    description: "Sophisticated lehenga choli with intricate embroidery",
    price: 95,
    slug: "lehenga-choli",
    category: "",
    image: "/images/newarrivals/lehenga choli.jpg",
  },
  {
    id: "4",
    name: "Kurta Sets",
    description: "Elegant kurta sets perfect for cooler weather",
    price: 110,
    slug: "kurta-sets",
    category: "",
    image: "/images/newarrivals/Kurta Sets.jpg",
  },
  // Categories (with unique IDs to avoid conflicts)
  {
    id: "cat-1",
    name: "Formal Gown",
    description: "Elegant formal gowns for special occasions",
    price: 150,
    slug: "formal-gown",
    category: "",
    image: "/images/categories/formal-gown.jpg",
  },
  {
    id: "cat-2",
    name: "Maxi Dress",
    description: "Beautiful maxi dresses for elegant style",
    price: 120,
    slug: "maxi-dress",
    category: "",
    image: "/images/categories/maxi-dress.jpg",
  },
  {
    id: "cat-3",
    name: "Cocktail Dress",
    description: "Chic cocktail dresses for evening events",
    price: 95,
    slug: "cocktail-dress",
    category: "",
    image: "/images/custom-dress/mannequin.png",
  },
  {
    id: "cat-4",
    name: "Seasonal Dress",
    description: "Trendy seasonal dresses for every occasion",
    price: 110,
    slug: "seasonal-dress",
    category: "",
    image: "/images/home/banner/banner.png",
  },
];

export const POST = async (req: NextRequest) => {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Return mock products that match requested IDs
    const wishlistProducts = mockWishlistProducts.filter((product) =>
      ids.includes(product.id)
    );

    return NextResponse.json(wishlistProducts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch wishlist products.", error);
    return NextResponse.json(
      { message: "Failed to fetch wishlist products." },
      { status: 500 }
    );
  }
};
