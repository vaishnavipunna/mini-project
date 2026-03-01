import { floatingInputClass } from "@/styles/formStyles";
import clsx from "clsx";
import { Controller, FieldError } from "react-hook-form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCategories } from "@/lib/api/categories/hooks";
import CategoryOptions from "./CategoryOptions";

interface ProductCategorySelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  error?: FieldError;
}

const ProductCategorySelect = ({
  control,
  error,
}: ProductCategorySelectProps) => {
  const { categories, error: fetchError, isLoading } = useCategories();

  return (
    <div className="space-y-2 relative">
      <Controller
        name="category"
        control={control}
        rules={{ required: "Category is required" }}
        defaultValue={""}
        render={({ field }) => (
          <select
            {...field}
            className={clsx(floatingInputClass, error && "border-red-600")}
            disabled={isLoading || !!fetchError}
          >
            <CategoryOptions
              categories={categories}
              isLoading={isLoading}
              error={fetchError}
            />
          </select>
        )}
      />

      {error && (
        <p className="text-red-600 text-xs ps-px flex items-center gap-2">
          <AiOutlineExclamationCircle />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ProductCategorySelect;
