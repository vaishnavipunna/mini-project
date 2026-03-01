import { connectToDatabase } from "@/lib/mongodb";
import { convertId } from "@/lib/mongoHelpers";
import { uploadToImgBB } from "@/lib/uploadToImgbb";
import Category from "@/models/Category";
import { CategoryDoc } from "@/types/category";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Get category by id
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const categoryId = (await params).id;

    if (!isValidObjectId(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const categoryDoc = await Category.findById(categoryId).lean<CategoryDoc>();

    if (!categoryDoc) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const category = convertId(categoryDoc);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const categoryId = (await params).id;

    if (!isValidObjectId(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const image = formData.get("image");

    // Validate name
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    // Regenerate slug
    let slug = slugify(name, { lower: true, strict: true });
    let counter = 1;
    while (await Category.exists({ slug, _id: { $ne: categoryId } })) {
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

    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug,
        image: imageUrl,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is enforced
      }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete category
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const categoryId = (await params).id;

    if (!isValidObjectId(categoryId)) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
