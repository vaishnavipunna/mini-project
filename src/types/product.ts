import { ObjectId } from "mongoose";
import { Id } from ".";

// Basic product properties (shared across backend and frontend)
export interface IProduct {
  name: string;
  image: string; // URL or path to image
  price: number;
  slug: string;
  category: Id | ObjectId;
  description?: string; // optional description for display purposes
}

export interface ProductDoc extends IProduct, Document {
  _id: ObjectId;
}

export interface ProductType extends IProduct {
  id: Id;
}

export interface CustomizedProduct {
  id: Id;
  customizations: {
    bodiceType: string;
    sleeveType: string;
    skirtType: string;
    fabric: string;
  };
  measurements: {
    length: number;
    sleeveLength: number;
    chest: number;
    waist: number;
  };
  product?: {
    id: Id;
    name: string;
    price: number;
    image: string;
  };

  isCustomDress: boolean;
  customDress?: {
    name: string;
    price: number;
  };

  request: string;
  quantity: number;
  totalPrice: number;
}
