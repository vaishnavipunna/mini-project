import { OrderType } from "@/types/order";
import DeliveryInfoCard from "./DeliveryInfoCard";
import OrderSummaryCard from "./OrderSummaryCard";
import PaymentCard from "./PaymentCard";
import OrderItemsCard from "./OrderItemsCard";
import OrderIdCard from "./OrderIdCard";
import MyOrderDetailsContainer from "../../components/MyOrderDetailsContainer";

interface MyOrderDetailsProps {
  order: OrderType;
}

const MyOrderDetails = ({ order }: MyOrderDetailsProps) => {
  const { id, deliveryDetails, items } = order;

  return (
    <MyOrderDetailsContainer>
      <div className="space-y-5">
        <OrderIdCard orderId={id} />
        <OrderItemsCard items={items} />
      </div>

      <div className="space-y-4">
        <OrderSummaryCard order={order} />
        <PaymentCard order={order} />
        <DeliveryInfoCard deliveryDetails={deliveryDetails} />
      </div>
    </MyOrderDetailsContainer>
  );
};

export default MyOrderDetails;
