import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    default: "No Description",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Categories", CategorySchema);
