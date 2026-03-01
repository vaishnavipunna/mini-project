import { connectToDatabase } from "@/lib/mongodb";
import { convertId } from "@/lib/mongoHelpers";
import Product from "@/models/Product";
import { ProductDoc } from "@/types/product";
import { NextResponse } from "next/server";

// Get product by slug
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const productSlug = (await params).slug;

    const isValidSlug = (slug: string) =>
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

    if (!isValidSlug(productSlug)) {
      return NextResponse.json(
        { message: "Invalid product slug" },
        { status: 400 }
      );
    }

    const productDoc = await Product.findOne(
      { slug: productSlug },
      {
        __v: 0,
      }
    ).lean<ProductDoc>();

    if (!productDoc) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const product = convertId(productDoc);

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
