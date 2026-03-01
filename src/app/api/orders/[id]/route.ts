import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { connectToDatabase } from "@/lib/mongodb";
import { convertId } from "@/lib/mongoHelpers";
import Order from "@/models/Order";
import { OrderDoc } from "@/types/order";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderId = (await params).id;

  if (!isValidObjectId(orderId)) {
    return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const orderDoc = await Order.findById(orderId, {
      __v: 0,
    }).lean<OrderDoc>();

    if (!orderDoc) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const order = convertId(orderDoc);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
