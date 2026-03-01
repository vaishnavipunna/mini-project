import { ObjectId } from "mongoose";

export function convertId<T extends { _id: ObjectId }>(doc: T) {
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export function convertIds<T extends { _id: ObjectId }>(docs: T[]) {
  return docs.map(convertId);
}
