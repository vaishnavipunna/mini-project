"use client";

import { UseFormReset } from "react-hook-form";
import { ProductType } from "@/types/product";
import toast from "react-hot-toast";
import ProductForm, { ProductFormData } from "@/components/forms/ProductForm";
import { useUpdateProduct } from "@/lib/api/products/hooks";
import { useRouter } from "next/navigation";

interface UpdateProductFormProps {
  product: ProductType;
}

const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
  const { id, name, image, price, category } = product || {};
  const { updateCategory, isUpdating } = useUpdateProduct(id);

  const router = useRouter();

  const handleUpdateProduct = async (
    data: ProductFormData,
    reset: UseFormReset<ProductFormData>
  ) => {
    if (
      name === data.name &&
      image === data.image &&
      price === data.price &&
      category === data.category
    ) {
      toast.error("No changes made to the product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);

    if (typeof data.image === "string") {
      formData.append("image", data.image);
    } else {
      formData.append("image", data.image[0]);
    }

    try {
      await updateCategory(formData);
      reset();
      router.push("/admin/products");
      toast.success("Product updated successfully!", { duration: 5000 });
    } catch (error) {
      toast.error("Failed to update product", { duration: 5000 });
      console.error(error);
    }
  };

  return (
    <ProductForm
      key={name + image + price + category} // to change the default value
      label="Update Product"
      isFormSubmitting={isUpdating}
      onSubmit={handleUpdateProduct}
      defaultValues={{
        name,
        image,
        price,
        category: category?.toString() || "",
      }}
    />
  );
};

export default UpdateProductForm;
