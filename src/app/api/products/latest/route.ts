import { connectToDatabase } from "@/lib/mongodb";
import { convertIds } from "@/lib/mongoHelpers";
import Product from "@/models/Product";
import { ProductDoc } from "@/types/product";
import { NextResponse } from "next/server";

// Get latest 8 products
export const GET = async () => {
  try {
    await connectToDatabase();

    const latestProductDocs = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .lean<ProductDoc[]>();

    const latestProducts = convertIds(latestProductDocs);

    return NextResponse.json(latestProducts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch latest products.", error);
    return NextResponse.json(
      { message: "Failed to fetch latest products." },
      { status: 500 }
    );
  }
};
