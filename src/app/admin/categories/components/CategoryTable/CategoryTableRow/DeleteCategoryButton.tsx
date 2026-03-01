"use client";

import { useConfirmDeleteModal } from "@/hooks/useConfirmDeleteModal";
import { useDeleteCategory } from "@/lib/api/categories/hooks";
import { Id } from "@/types";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import { revalidateCategories } from "../../../actions";

interface DeleteCategoryButtonProps {
  categoryId: Id;
}

const DeleteCategoryButton = ({ categoryId }: DeleteCategoryButtonProps) => {
  const { deleteCategory } = useDeleteCategory(categoryId);

  const confirmDelete = useConfirmDeleteModal();

  const handleDelete = async () => {
    const confirmed = await confirmDelete(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      toast.promise(
        deleteCategory(),
        {
          loading: "Deleting category...",
          success: "Category deleted successfully!",
          error: "Failed to delete category",
        },
        { duration: 3000 }
      );
      revalidateCategories();
    } catch (error) {
      toast.error("Failed to delete product", { duration: 5000 });
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete} className="size-6 grid place-items-center">
      <LuTrash2 />
    </button>
  );
};

export default DeleteCategoryButton;
