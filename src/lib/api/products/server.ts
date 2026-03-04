import mockProducts from "@/lib/data/mockProducts";

export const getLatestProducts = async () => {
  // return the first 8 for now
  return mockProducts.slice(0, 8);
};

export const getProductBySlug = async (slug: string) => {
  return mockProducts.find((p) => p.slug === slug) || null;
};

export const getProductById = async (productId: string) => {
  return mockProducts.find((p) => p.id === productId) || null;
};
