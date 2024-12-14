import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    firstName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "owner"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
