import { Id } from "@/types";
import MyOrderDetails from "./components/MyOrderDetails";
import OrderNotFound from "./components/OrderNotFound";
import { getOrderById } from "@/lib/api/orders/server";


interface Params {
  params: Promise<{ id: Id }>;
}

export async function generateMetadata({ params }: Params) {
  const orderId = (await params).id;

  return {
    title: `Order #${orderId} Details`,
  };
}

const MyOrderDetailsPage = async ({ params }: Params) => {
  const orderId = (await params).id;
  const order = await getOrderById(orderId);

  if (!order) {
    return <OrderNotFound />;
  }

  return <MyOrderDetails order={order} />;
};

export default MyOrderDetailsPage;
