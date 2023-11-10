const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    products: [
      {
        productTitle: {
          type: String,
          require: true,
        },
        productPrice: { type: Number, require: true },
        quantity: { type: Number, require: true },
        totalPrice: { type: Number, require: true },
      },
    ],
    totalQuantity: { type: Number, require: true },
    totalCost: { type: Number, require: true },
    orderIsActive: { type: Boolean, default: false },
    orderedDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
