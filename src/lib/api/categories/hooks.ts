import useSWR from "swr";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "./fetchers";
import { CategoryType } from "@/types/category";
import { Id } from "@/types";
import useSWRMutation from "swr/mutation";

// --- Keys
export const categoriesKey = "/api/categories";
const categoryKey = (id: Id) => `/api/categories/${id}`;

export const useCategories = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useSWR<CategoryType[], Error>(categoriesKey, fetchCategories);

  return { categories: data, isLoading, error };
};

export const useCreateCategory = () => {
  const { trigger, isMutating } = useSWRMutation(categoriesKey, createCategory);

  return { createCategory: trigger, isCreating: isMutating };
};

export const useUpdateCategory = (id: Id) => {
  const { trigger, isMutating } = useSWRMutation(
    categoryKey(id),
    updateCategory
  );

  return { updateCategory: trigger, isUpdating: isMutating };
};

export const useDeleteCategory = (id: Id) => {
  const { trigger, isMutating } = useSWRMutation(
    categoryKey(id),
    deleteCategory
  );

  return { deleteCategory: trigger, isDeleting: isMutating };
};
