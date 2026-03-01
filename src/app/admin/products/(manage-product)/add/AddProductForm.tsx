"use client";

import ProductForm, { ProductFormData } from "@/components/forms/ProductForm";
import { useCreateProduct } from "@/lib/api/products/hooks";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const { createProduct, isCreating } = useCreateProduct();

  const handleAddProduct = async (
    data: ProductFormData,
    reset: UseFormReset<ProductFormData>
  ) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("image", data.image[0]);

    try {
      await createProduct(formData);
      reset();
      toast.success("Product created successfully!", { duration: 5000 });
    } catch (error) {
      toast.error("Failed to create product", { duration: 5000 });
      console.error(error);
    }
  };

  return (
    <ProductForm
      label="Add Product"
      isFormSubmitting={isCreating}
      onSubmit={handleAddProduct}
    />
  );
};

export default AddProductForm;
