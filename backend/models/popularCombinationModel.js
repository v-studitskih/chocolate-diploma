import mongoose from "mongoose";
const popularCombinationSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String, required: true },

  image: { type: String, required: true },

  price: { type: Number, required: true },

  options: {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    base: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    filling: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

    decor: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

    packaging: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },

  isActive: { type: Boolean, default: true },
});

const popularCombinationModel =
  mongoose.models.popularCombination ||
  mongoose.model("popularCombination", popularCombinationSchema);
export default popularCombinationModel;
