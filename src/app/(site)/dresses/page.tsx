import ProductFilters from "@/components/ui/ProductFilters";
import DressesList from "./DressesList";

export const metadata = {
  title: "Dresses",
};

const DressesPage = () => {
  return (
    <div className="ui-container mt-8 mb-12">
      <ProductFilters />
      <DressesList />
    </div>
  );
};

export default DressesPage;
