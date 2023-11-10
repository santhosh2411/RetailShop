const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productTitle: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
