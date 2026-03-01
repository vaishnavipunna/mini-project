import DeliveryInfoCardSkeleton from "./components/MyOrderDetails/DeliveryInfoCard/DeliveryInfoCardSkeleton";
import OrderIdCardSkeleton from "./components/MyOrderDetails/OrderIdCard/OrderIdCardSkeleton";
import OrderItemsCardSkeleton from "./components/MyOrderDetails/OrderItemsCard/OrderItemsCardSkeleton";
import OrderSummaryCardSkeleton from "./components/MyOrderDetails/OrderSummaryCard/OrderSummaryCardSkeleton";
import PaymentCardSkeleton from "./components/MyOrderDetails/PaymentCard/PaymentCardSkeleton";
import MyOrderDetailsContainer from "./components/MyOrderDetailsContainer";

const OrderDetailsLoadingPage = () => {
  return (
    <MyOrderDetailsContainer>
      <div className="space-y-5">
        <OrderIdCardSkeleton />
        <OrderItemsCardSkeleton />
      </div>

      <div className="space-y-4">
        <OrderSummaryCardSkeleton />
        <PaymentCardSkeleton />
        <DeliveryInfoCardSkeleton />
      </div>
    </MyOrderDetailsContainer>
  );
};

export default OrderDetailsLoadingPage;
