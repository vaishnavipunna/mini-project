import { connectToDatabase } from "@/lib/mongodb";
import { convertId } from "@/lib/mongoHelpers";
import { uploadToImgBB } from "@/lib/uploadToImgbb";
import Product from "@/models/Product";
import { ProductDoc } from "@/types/product";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Get product by id endpoint
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const productId = (await params).id;

    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const productDoc = await Product.findById(productId, {
      __v: 0,
    }).lean<ProductDoc>();

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

// Update product endpoint
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const productId = (await params).id;

    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const category = formData.get("category");
    const price = formData.get("price");
    const image = formData.get("image");

    // Validate name
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate category
    if (
      !category ||
      typeof category !== "string" ||
      !isValidObjectId(category)
    ) {
      return NextResponse.json(
        {
          message:
            "Category ID is required, must be a string, and must be a valid ObjectId",
        },
        { status: 400 }
      );
    }

    // Validate price
    if (!price || isNaN(Number(price))) {
      return NextResponse.json(
        { message: "Price is required and must be a number" },
        { status: 400 }
      );
    }

    // Regenerate slug
    let slug = slugify(name, { lower: true, strict: true });
    let counter = 1;
    while (await Product.exists({ slug, _id: { $ne: productId } })) {
      slug = `${slug}-${counter++}`;
    }

    // Validate image
    if (
      !image ||
      (typeof image !== "string" &&
        (typeof image !== "object" || !("arrayBuffer" in image)))
    ) {
      return NextResponse.json(
        { message: "Image is required and must be a string or a valid file" },
        { status: 400 }
      );
    }

    // Upload if it's a file; otherwise use the existing URL
    const imageUrl =
      typeof image === "object" ? await uploadToImgBB(image, slug) : image;

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        slug,
        price: Number(price),
        image: imageUrl,
        category: new Types.ObjectId(category),
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is enforced
      }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to update product:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

//Delete product endpoint
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const productId = (await params).id;

    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to delete product:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
