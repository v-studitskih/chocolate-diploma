import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: {
    type: String,
    required: true,
    enum: ["form", "base", "filling", "decor", "packaging"],
  },
  sizes: { type: Array, required: true },
  popularity: { type: Boolean, default: false },
  date: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  defaultOption: { type: Boolean, default: false },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
