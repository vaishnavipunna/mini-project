"use client";

import { useForm, UseFormReset } from "react-hook-form";
import ImageField from "../components/ImageField";
import ProductCategorySelect from "./ProductCategorySelect";
import InputField from "@/components/forms/components/InputField";
import FormSubmitButton from "../components/FormSubmitButton";

export interface ProductFormData {
  name: string;
  price: number;
  category: string;
  image: FileList | string;
}

interface ProductFormProps {
  label: string;
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (
    data: ProductFormData,
    reset: UseFormReset<ProductFormData>
  ) => void;
  isFormSubmitting: boolean;
}

const ProductForm = ({
  label,
  isFormSubmitting,
  defaultValues,
  onSubmit,
}: ProductFormProps) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({ defaultValues });

  return (
    <>
      <h3 className="text-2xl text-center font-semibold">{label}</h3>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        className="max-w-xl mt-8 p-8 rounded mx-auto bg-white space-y-6"
      >
        <InputField
          id="name"
          label="Product Name"
          type="text"
          registerProps={register("name", {
            required: "Product Name is required",
          })}
          error={errors?.name}
        />

        <InputField
          id="price"
          label="Price"
          type="number"
          registerProps={register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          })}
          error={errors.price}
        />

        <ProductCategorySelect control={control} error={errors.category} />

        <ImageField
          register={register}
          error={errors.image}
          watchImage={watch("image")}
          defaultImageUrl={
            typeof defaultValues?.image === "string"
              ? defaultValues.image
              : undefined
          }
        />

        <FormSubmitButton isFormSubmitting={isFormSubmitting} label={label} />
      </form>
    </>
  );
};

export default ProductForm;
