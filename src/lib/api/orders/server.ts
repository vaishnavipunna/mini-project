import { OrderDoc } from "@/types/order";
import Order from "@/models/Order";
import { connectToDatabase } from "@/lib/mongodb";
import { convertId, convertIds } from "@/lib/mongoHelpers";
import { Id } from "@/types";

export const getMyOrders = async (userId: string) => {
  try {
    await connectToDatabase();

    const orderDocs = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean<OrderDoc[]>();

    return convertIds(orderDocs);
  } catch (error) {
    console.error("Error fetching orders:", error);

    return [];
  }
};

export const getOrderById = async (orderId: Id) => {
  try {
    await connectToDatabase();

    const orderDoc = await Order.findById(orderId, {
      __v: 0,
    }).lean<OrderDoc>();

    if (!orderDoc) return null;

    return convertId(orderDoc);
  } catch (error) {
    console.error("Error fetching order by ID:", error);

    return null;
  }
};

