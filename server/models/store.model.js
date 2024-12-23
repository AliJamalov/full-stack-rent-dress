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
    phone: {
      type: String,
      required: true,
    },
    storeAddress: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Store = mongoose.model("Store", StoreSchema);
