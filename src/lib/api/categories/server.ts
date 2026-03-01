import { connectToDatabase } from "@/lib/mongodb";
import { convertId, convertIds } from "@/lib/mongoHelpers";
import Category from "@/models/Category";
import { Id } from "@/types";
import { CategoryDoc } from "@/types/category";

export const getCategories = async () => {
  try {
    await connectToDatabase();
    const categoryDocs = await Category.find().lean<CategoryDoc[]>();

    return convertIds(categoryDocs);
  } catch (error) {
    console.error("Error fetching categories:", error);

    return [];
  }
};

export const getCategoryById = async (categoryId: Id) => {
  try {
    await connectToDatabase();
    const categoryDoc = await Category.findById(categoryId).lean<CategoryDoc>();

    if (!categoryDoc) return null;

    const catgory = convertId(categoryDoc);

    return catgory;
  } catch (error) {
    console.error("Error fetching category by id: ", error);

    return null;
  }
};
