import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: {
    type: [
      {
        productName: { type: String, required: true },

        quantity: { type: Number, default: 1 },

        customization: {
          form: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            name: { type: String },
            price: { type: Number, default: 0 },
          },
          base: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            name: { type: String },
            price: { type: Number, default: 0 },
          },
          filling: [
            {
              id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
              name: { type: String },
              price: { type: Number, default: 0 },
            },
          ],
          decor: [
            {
              id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
              name: { type: String },
              price: { type: Number, default: 0 },
            },
          ],
          packaging: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            name: { type: String },
            price: { type: Number, default: 0 },
          },
        },

        totalPrice: { type: Number, required: true },
      },
    ],
    required: true,
  },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Заказ оформлен" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
