import { ObjectId } from "mongoose";
import { Id } from ".";

export interface ICategory {
  name: string;
  image: string;
  slug: string;
}

export interface CategoryDoc extends ICategory {
  _id: ObjectId;
}

export interface CategoryType extends ICategory {
  id: Id;
}
