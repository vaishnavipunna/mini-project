import { getProductById } from "@/lib/api/products/server";
import UpdateProductForm from "./UpdateProductForm";

export const metadata = {
  title: "Edit Product - Admin",
};

interface Params {
  params: Promise<{ id: string }>;
}

const EditProductPage = async ({ params }: Params) => {
  const productId = (await params).id;
  const product = await getProductById(productId);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <UpdateProductForm product={product} />;
};

export default EditProductPage;
