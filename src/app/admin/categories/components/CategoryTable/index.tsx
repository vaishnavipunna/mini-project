import NoCategoryFound from "../NoCategoryFound";
import CategoryTableRow from "./CategoryTableRow";
import CategoryTableContainer from "./CategoryTableContainer";
import { CategoryType } from "@/types/category";

interface CategoryTableProps {
  categories: CategoryType[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
  if (categories.length === 0) {
    return <NoCategoryFound />;
  }

  return (
    <CategoryTableContainer>
      {categories.map((category) => (
        <CategoryTableRow key={category.id} category={category} />
      ))}
    </CategoryTableContainer>
  );
};

export default CategoryTable;
