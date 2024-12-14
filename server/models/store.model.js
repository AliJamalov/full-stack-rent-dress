import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeDescription: {
      type: String,
      default: "",
    },
    storePhoto: {
      type: String,
      required: true,
    },
    storeAddress: {
      city: { type: String, required: true },
      street: { type: String, required: true },
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Store = mongoose.model("Store", StoreSchema);
