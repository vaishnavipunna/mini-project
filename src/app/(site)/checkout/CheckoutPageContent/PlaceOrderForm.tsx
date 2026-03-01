"use client";

import EmailField from "@/components/forms/components/EmailField";
import InputField from "@/components/forms/components/InputField";
import useCart from "@/hooks/useCart";
import { floatingInputClass } from "@/styles/formStyles";
import { IOrder } from "@/types/order";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";

export interface PlaceOrderFormData {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
}

interface PlaceOrderFormProps {
  handleCreateOrder: (
    order: IOrder,
    reset: UseFormReset<PlaceOrderFormData>
  ) => void;
}

const PlaceOrderForm = ({ handleCreateOrder }: PlaceOrderFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlaceOrderFormData>();

  const user = useSession().data?.user;
  const { cart, cartTotal } = useCart();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const handlePlaceOrder = (data: PlaceOrderFormData) => {
    const newOrder: IOrder = {
      deliveryDetails: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        deliveryAddress: data.deliveryAddress,
      },
      items: cart,
      totalPrice: cartTotal,
      paymentMethod: "cash on delivery",
    };

    handleCreateOrder(newOrder, reset);
  };

  return (
    <div className="p-4 sm:p-6 rounded bg-light-light space-y-4">
      <h3 className="font-semibold sm:text-lg">Delivery Info</h3>

      <form
        id="place-order-form"
        onSubmit={handleSubmit(handlePlaceOrder)}
        className="space-y-5 bg-inherit"
      >
        <InputField
          id="name"
          label="Full Name"
          type="text"
          registerProps={register("name", {
            required: "Full Name is required",
          })}
          error={errors?.name}
        />

        <EmailField register={register} error={errors?.email} />

        <InputField
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          registerProps={register("phoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^\+?[\d\s\-().]{10,}$/,
              message: "Please enter a valid phone number",
            },
          })}
          error={errors?.phoneNumber}
        />

        <InputField
          id="deliveryAddress"
          label="Delivery Address"
          type="text"
          registerProps={register("deliveryAddress", {
            required: "Delivery Address is required",
          })}
          error={errors?.deliveryAddress}
        />

        <div
          className={clsx(
            floatingInputClass,
            "text-dark-light flex justify-between items-center"
          )}
        >
          Cash on Delivery
          <BsCheckCircleFill className="text-dark/80" />
        </div>
      </form>
    </div>
  );
};

export default PlaceOrderForm;
