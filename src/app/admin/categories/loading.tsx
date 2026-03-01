import CategoriesPageHeader from "./components/CategoriesPageHeader";
import CategoryTableSkeleton from "./components/CategoryTable/CategoryTableSkeleton";

const AdminCategoriesLoadingPage = () => {
  return (
    <>
      <CategoriesPageHeader />
      <CategoryTableSkeleton />
    </>
  );
};

export default AdminCategoriesLoadingPage;
