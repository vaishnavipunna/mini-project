import { Id } from "@/types";
import useSWRMutation from "swr/mutation";
import { createProduct, deleteProduct, updateProduct } from "./fetchers";

// --- Keys
export const productsKey = "/api/products";
const productKey = (id: Id) => `/api/products/${id}`;

export const useCreateProduct = () => {
  const { trigger, isMutating } = useSWRMutation(productsKey, createProduct);

  return { createProduct: trigger, isCreating: isMutating };
};

export const useUpdateProduct = (id: Id) => {
  const { trigger, isMutating } = useSWRMutation(productKey(id), updateProduct);

  return { updateCategory: trigger, isUpdating: isMutating };
};

export const useDeleteProduct = (id: Id) => {
  const { trigger, isMutating } = useSWRMutation(productKey(id), deleteProduct);

  return { deleteProduct: trigger, isDeleting: isMutating };
};
