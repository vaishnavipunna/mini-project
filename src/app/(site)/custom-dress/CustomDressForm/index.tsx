"use client";

import MeasurementInputsSection from "@/components/forms/components/customize/MeasurementInputsSection";
import SpecialRequest from "@/components/forms/components/customize/SpecialRequest";
import FormSubmitButton from "@/components/forms/components/FormSubmitButton";
import { CustomizationFormData } from "@/types";
import { useForm } from "react-hook-form";
import DressDesigner from "./DressDesigner";
import useCart from "@/hooks/useCart";
import useModalById from "@/hooks/useModalById";


const CustomDressForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CustomizationFormData>();

  const { addToCart } = useCart();
  const { openModal } = useModalById("addToCartModal");

  const handleAddToCart = (data: CustomizationFormData) => {
    const cartItem = {
      customizations: {
        bodiceType: data.bodiceType,
        sleeveType: data.sleeveType,
        skirtType: data.skirtType,
        fabric: data.fabric,
      },
      measurements: {
        length: data.length,
        sleeveLength: data.sleeveLength,
        chest: data.chest,
        waist: data.waist,
      },
      isCustomDress: true,
      customDress: {
        name: "Custom Dress",
        price: 50,
      },
      quantity: 1,
      totalPrice: 50,
      request: data.request,
    };

    addToCart(cartItem);
    reset();
    openModal();
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddToCart)}
      className="bg-light space-y-6"
    >
      <DressDesigner register={register} watch={watch} errors={errors} />

      <MeasurementInputsSection register={register} errors={errors} />
      <SpecialRequest register={register} />

      <FormSubmitButton label="Add to Cart" isFormSubmitting={false} />
    </form>
  );
};

export default CustomDressForm;
