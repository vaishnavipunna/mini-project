import useSWRMutation from "swr/mutation";
import { createOrder } from "./fetchers";

export const useCreateOrder = () => {
  const { trigger, isMutating } = useSWRMutation("/api/orders", createOrder);

  return { createOrder: trigger, isCreating: isMutating };
};
