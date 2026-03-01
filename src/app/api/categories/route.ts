import { connectToDatabase } from "@/lib/mongodb";
import { convertIds } from "@/lib/mongoHelpers";
import { uploadToImgBB } from "@/lib/uploadToImgbb";
import Category from "@/models/Category";
import { CategoryDoc } from "@/types/category";
import { NextResponse } from "next/server";
import slugify from "slugify";

// Get categories
export async function GET() {
  // Return mock categories to avoid database dependency during development
  try {
    const categories = [
      {
        id: "cat-1",
        name: "Formal Gown",
        slug: "formal-gown",
        image: "/images/categories/formal-gown.jpg",
      },
      {
        id: "cat-2",
        name: "Maxi Dress",
        slug: "maxi-dress",
        image: "/images/categories/maxi-dress.jpg",
      },
      {
        id: "cat-3",
        name: "Cocktail Dress",
        slug: "cocktail-dress",
        image: "/images/custom-dress/mannequin.png",
      },
      {
        id: "cat-4",
        name: "Seasonal Dress",
        slug: "seasonal-dress",
        image: "/images/home/banner/banner.png",
      },
    ];

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Create category
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const formData = await request.formData();

    const name = formData.get("name");
    const imageFile = formData.get("image") as File;

    // Basic validation
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    if (
      !imageFile ||
      typeof imageFile !== "object" ||
      !("arrayBuffer" in imageFile)
    ) {
      return NextResponse.json(
        { message: "Image is required and must be a valid file" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = slugify(name, { lower: true, strict: true });
    let counter = 1;

    while (await Category.exists({ slug })) {
      slug = `${slug}-${counter++}`;
    }

    // Upload image to ImgBB
    const imageUrl = await uploadToImgBB(imageFile, slug);

    // Create and save the new category
    const newCategory = new Category({ name, image: imageUrl, slug });
    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create category:", error);

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}
