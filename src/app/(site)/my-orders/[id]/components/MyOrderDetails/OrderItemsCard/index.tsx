import CustomizedProductInfo from "@/components/ui/CustomizedProductInfo";
import CustomizedProductPreview from "@/components/ui/CustomizedProductPreview";
import { CustomizedProduct } from "@/types/product";

interface OrderItemsCardProps {
  items: CustomizedProduct[];
}

const OrderItemsCard = ({ items }: OrderItemsCardProps) => {
  return (
    <div className="p-4 sm:p-6 pb-0 sm:pb-0 rounded bg-light-light">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold sm:text-lg">Order Items</h3>
        <p className="text-sm text-dark-light">{items.length} items</p>
      </div>

      <div className="divide-y">
        {items.map((item) => {
          const {
            customizations: { bodiceType, sleeveType, skirtType },
            product,
            isCustomDress,
            quantity,
            totalPrice,
          } = item;

          return (
            <div key={item.id} className="py-4">
              {/* Desktop layout */}
              <div className="hidden sm:grid grid-cols-[140px_1.5fr_1fr_1fr] lg:grid-cols-[140px_4fr_1fr_1fr] xl:grid-cols-[140px_1fr_1fr_1fr] sm:gap-6 items-center">
                <CustomizedProductPreview
                  isCustomDress={isCustomDress}
                  productImage={product?.image}
                  bodice={bodiceType}
                  sleeve={sleeveType}
                  skirt={skirtType}
                />

                <CustomizedProductInfo customizedProduct={item} />

                <p className="font-medium text-sm text-dark-light text-nowrap justify-self-center">
                  <span className="text-xs">X</span> {quantity}
                </p>

                <p className="font-medium text-dark-light text-sm justify-self-end">
                  ${totalPrice}
                </p>
              </div>

              {/* Mobile layout */}
              <div className="sm:hidden grid grid-cols-[1fr_1.5fr] gap-4">
                <CustomizedProductPreview
                  isCustomDress={isCustomDress}
                  productImage={product?.image}
                  bodice={bodiceType}
                  sleeve={sleeveType}
                  skirt={skirtType}
                />

                <div className="space-y-2">
                  <CustomizedProductInfo customizedProduct={item} />

                  <div className="ms-1 flex justify-between text-xs font-medium text-dark-light">
                    <p>QTY: {quantity}</p>
                    <p>${totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItemsCard;
