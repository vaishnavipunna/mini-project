import { NextRequest, NextResponse } from "next/server";
import mockProducts from "@/lib/data/mockProducts";

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


