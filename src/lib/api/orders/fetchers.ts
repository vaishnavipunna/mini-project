import { IOrder } from "@/types/order";

export const createOrder = async (url: string, { arg }: { arg: IOrder }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};
