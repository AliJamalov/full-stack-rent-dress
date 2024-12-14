import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model("Category", CategorySchema);
