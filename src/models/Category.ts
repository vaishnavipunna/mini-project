import { CategoryDoc} from "@/types/category";
import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema<CategoryDoc>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Category =
  models.Category || model<CategoryDoc>("Category", CategorySchema);

export default Category;
