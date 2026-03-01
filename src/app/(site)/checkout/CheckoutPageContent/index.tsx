"use client";

import OrderSummary from "./OrderSummary";
import PlaceOrderForm, { PlaceOrderFormData } from "./PlaceOrderForm";
import { IOrder } from "@/types/order";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import useCart from "@/hooks/useCart";
import useModalById from "@/hooks/useModalById";
import NoCheckoutItemFound from "./NoCheckoutItemFound";
import { useCreateOrder } from "@/lib/api/orders/hooks";

const CheckoutPageContent = () => {
  const { createOrder, isCreating } = useCreateOrder();
  const { cart, clearCart } = useCart();
  const { openModal: openOrderSuccessModal } =
    useModalById("orderSuccessModal");

  if (cart.length === 0) {
    return <NoCheckoutItemFound />;
  }

  const handleCreateOrder = async (
    order: IOrder,
    reset: UseFormReset<PlaceOrderFormData>
  ) => {
    try {
      await createOrder(order);
      openOrderSuccessModal();
      reset();
      clearCart();
    } catch (error) {
      toast.error("Failed to place the order.");
      console.error(error);
    }
  };

  return (
    <div className="ui-container mt-8 mb-12">
      <h2 className="mb-8 text-2xl font-semibold text-center">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8">
        <PlaceOrderForm handleCreateOrder={handleCreateOrder} />

        <OrderSummary isCreatingOrder={isCreating} />
      </div>
    </div>
  );
};

export default CheckoutPageContent;
