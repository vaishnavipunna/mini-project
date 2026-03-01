import { getCategories } from "@/lib/api/categories/server";
import CategoriesPageHeader from "./components/CategoriesPageHeader";
import CategoryTable from "./components/CategoryTable";

export const metadata = {
  title: "Manage Categories - Admin",
};

const AdminCategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <CategoriesPageHeader />
      <CategoryTable categories={categories} />
    </>
  );
};

export default AdminCategoriesPage;
