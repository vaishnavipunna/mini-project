import { OrderType } from "@/types/order";
import OrderCardImage from "./OrderCardImage";
import Link from "next/link";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { id, totalPrice, status, items } = order;

  const itemNames = items.map((item) =>
    item.isCustomDress ? item.customDress?.name : item.product?.name
  );

  return (
    <Link
      href={`/my-orders/${id}`}
      className="block p-4 rounded bg-light-light relative"
    >
      <div className="min-w-0 flex gap-4">
        <OrderCardImage orderItems={items} />

        <div className="flex-1 min-w-0 space-y-2 text-sm">
          <h6 className="font-semibold truncate sm:text-base">
            Order Id #{id}
          </h6>
          <div className="text-dark-light font-medium space-y-1">
            <p className="truncate">{itemNames.join(" | ")}</p>
            <p>Items: {items.length}</p>
          </div>
          <h6 className="font-semibold">${totalPrice}</h6>
        </div>
      </div>

      <div className="absolute bottom-4 sm:top-4 right-4">
        <OrderStatusBadge status={status} />
      </div>
    </Link>
  );
};

export default OrderCard;
