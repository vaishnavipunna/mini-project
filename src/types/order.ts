import { ObjectId } from "mongoose";
import { Id } from ".";
import { CustomizedProduct } from "./product";

export type OrderStatusType =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered";

export interface IOrder {
  deliveryDetails: {
    name: string;
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
  };
  items: CustomizedProduct[];
  totalPrice: number;
  paymentMethod: "cash on delivery" | "online";
}

export interface OrderDoc extends IOrder {
  _id: ObjectId;
  user: ObjectId;
  createdAt: string;
  status: OrderStatusType;
}

export interface OrderType extends IOrder {
  id: Id;
  createdAt: string;
  status: OrderStatusType;
}
