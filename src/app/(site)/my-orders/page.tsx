import OrderCard from "./components/OrderCard";
import NoOrderFound from "./components/NoOrderFound";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getMyOrders } from "@/lib/api/orders/server";

export const metadata = {
  title: "My Orders",
};

const MyOrdersPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/unauthorized");
  }

  const orders = await getMyOrders(user.id);

  if (orders.length === 0) {
    return <NoOrderFound />;
  }

  return (
    <div className="ui-container mt-8 mb-12">
      <h2 className="mb-8 text-2xl font-semibold text-center">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
