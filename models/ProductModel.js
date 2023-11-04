const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productTitle: {
      type: String,
      require: true,
    },
    productPrice: {
      type: String,
      require: true,
    },
    productDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
