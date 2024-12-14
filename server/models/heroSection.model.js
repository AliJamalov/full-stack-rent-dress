import mongoose from "mongoose";

const HeroSectionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const HeroSection = mongoose.model("HeroSection", HeroSectionSchema);
