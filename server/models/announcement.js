import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    clothingCollection: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
