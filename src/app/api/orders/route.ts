import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { connectToDatabase } from "@/lib/mongodb";
import { convertIds } from "@/lib/mongoHelpers";
import Order from "@/models/Order";
import { OrderDoc } from "@/types/order";
import { NextResponse } from "next/server";

// Get my orders
export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId = user.id;

    const orderDocs = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean<OrderDoc[]>();

    const orders = convertIds(orderDocs);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Create order
export const POST = async (request: Request) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const { deliveryDetails, items, totalPrice, paymentMethod } = data;

  if (!deliveryDetails || typeof deliveryDetails !== "object") {
    return NextResponse.json(
      { message: "Delivery details are required." },
      { status: 400 }
    );
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { message: "Items are required." },
      { status: 400 }
    );
  }

  if (typeof totalPrice !== "number" || totalPrice <= 0) {
    return NextResponse.json(
      { message: "Total price must be a positive number." },
      { status: 400 }
    );
  }

  if (!paymentMethod || typeof paymentMethod !== "string") {
    return NextResponse.json(
      { message: "Payment method is required." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const userId = user.id;

    const newOrder = new Order({
      user: userId,
      deliveryDetails,
      items,
      totalPrice,
      paymentMethod,
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create order:", error);

    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
};
