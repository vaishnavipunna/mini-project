"use client";

import CategoryForm, {
  CategoryFormData,
} from "@/components/forms/CategoryForm";
import { useCreateCategory } from "@/lib/api/categories/hooks";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

const AddCategoryForm = () => {
  const { createCategory, isCreating } = useCreateCategory();

  const handleAddCategory = async (
    data: CategoryFormData,
    reset: UseFormReset<CategoryFormData>
  ) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    try {
      await createCategory(formData);
      reset();
      toast.success("Category created successfully!", { duration: 5000 });
    } catch (error) {
      toast.error("Failed to create category.", { duration: 5000 });
      console.error(error);
    }
  };

  return (
    <CategoryForm
      label="Add Category"
      isFormSubmitting={isCreating}
      onSubmit={handleAddCategory}
    />
  );
};

export default AddCategoryForm;
