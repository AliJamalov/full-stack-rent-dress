import mongoose from "mongoose";

const ClothingCollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const ClothingCollection = mongoose.model(
  "ClothingCollection",
  ClothingCollectionSchema
);
