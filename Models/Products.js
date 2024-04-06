import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Products", ProductSchema);
