import { CategoryType } from "@/types/category";

interface CategoryOptionsProps {
  categories: CategoryType[];
  isLoading: boolean;
  error: Error | undefined;
}

const CategoryOptions = ({
  categories,
  isLoading,
  error,
}: CategoryOptionsProps) => {
  if (isLoading) {
    return <option value="">Loading...</option>;
  }

  if (error) {
    console.error("Failed to fetch categories:", error);

    return <option value="">Failed to load categories</option>;
  }

  if (!categories || categories.length === 0) {
    return <option value="">No categories found</option>;
  }

  return (
    <>
      <option value="" disabled>
        Select Category
      </option>

      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </>
  );
};

export default CategoryOptions;
