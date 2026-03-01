import { NextRequest, NextResponse } from "next/server";
import { ProductType } from "@/types/product";

// Mock products data
const mockProducts: ProductType[] = [
  // dresses page specific images (put your new files under public/images/dresses)
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
  // categories can keep their own images or be omitted if you don't want them here
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

// Get products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let filtered = [...mockProducts];

    // Search filter
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Pagination
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return NextResponse.json(
      {
        products: paginated,
        pagination: {
          totalItems: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
          page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get products:", error);

    return NextResponse.json(
      { message: "Failed to get products" },
      { status: 500 }
    );
  }
}


