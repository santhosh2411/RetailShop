const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    productTitle: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productQuantity: {
      type: Number,
      require: true,
      default: 1,
    },
    prodTotalQuantityPrice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

CartSchema.pre("save", function (next) {
  this.prodTotalQuantityPrice = this.productQuantity * this.productPrice;
  next();
});


module.exports = mongoose.model("Cart", CartSchema);
