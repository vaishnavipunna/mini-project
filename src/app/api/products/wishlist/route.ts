import { NextRequest, NextResponse } from "next/server";
import { ProductDoc } from "@/types/product";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { convertId } from "@/lib/mongoHelpers";
import { isValidObjectId } from "mongoose";

// fetch products directly from database using provided ids
export const POST = async (req: NextRequest) => {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await connectToDatabase();

    // filter only valid ObjectId strings to avoid mongoose errors
    const validIds = ids.filter((id) => isValidObjectId(id));

    const productDocs = await Product.find({
      _id: { $in: validIds },
    }).lean<ProductDoc>();

    const products = productDocs.map(convertId);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch wishlist products.", error);
    return NextResponse.json(
      { message: "Failed to fetch wishlist products." },
      { status: 500 }
    );
  }
};
