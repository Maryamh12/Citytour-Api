import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // Users register with their email address, which needs to be unique.
    email: { type: String, required: true, unique: true },
    // But their display name (userName) does not have to be unique.
    userName: { type: String, required: true },
    password: { type: String, required: true },
    //   enum -> enumeration is a way of specifying a certain number
    // of allowed values.
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
