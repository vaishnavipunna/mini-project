import { ProductDoc } from "@/types/product";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, name: 1 }); // category filter + name sort
ProductSchema.index({ category: 1, price: 1 }); // category filter + price sort
ProductSchema.index({ createdAt: -1 }); // sort by newest

const Product = models.Product || model<ProductDoc>("Product", ProductSchema);

export default Product;
