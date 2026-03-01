"use client";

import CategoryForm, {
  CategoryFormData,
} from "@/components/forms/CategoryForm";
import { useUpdateCategory } from "@/lib/api/categories/hooks";
import { CategoryType } from "@/types/category";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateCategoryFormProps {
  category: CategoryType;
}

const UpdateCategoryForm = ({ category }: UpdateCategoryFormProps) => {
  const { id, name, image } = category || {};
  const { updateCategory, isUpdating } = useUpdateCategory(id);

  const router = useRouter();

  const handleUpdateCategory = async (
    data: CategoryFormData,
    reset: UseFormReset<CategoryFormData>
  ) => {
    if (name === data.name && image === data.image) {
      toast.error("No changes made to the category.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);

    if (typeof data.image === "string") {
      formData.append("image", data.image);
    } else {
      formData.append("image", data.image[0]);
    }

    try {
      await updateCategory(formData);
      reset();
      router.push("/admin/categories");
      toast.success("Category updated successfully!", { duration: 5000 });
    } catch (error) {
      toast.error("Failed to update category", { duration: 5000 });
      console.error(error);
    }
  };

  return (
    <CategoryForm
      label="Update Category"
      isFormSubmitting={isUpdating}
      onSubmit={handleUpdateCategory}
      defaultValues={{
        name,
        image,
      }}
    />
  );
};

export default UpdateCategoryForm;
