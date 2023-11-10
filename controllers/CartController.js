const mongoose = require("mongoose");
const cartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");

///// To create a task Post

const addProductCart = async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product Not Found" });
  }
  try {
    const product = await ProductModel.findById({
      _id: id,
    });

    const { productTitle, productPrice } = product;

    const productCart = await cartModel.create({
      productTitle,
      productPrice,
    });

    res.status(200).json(productCart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateProdQuantity = async (req, res) => {
  const { id, type } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not found" });
  }
  try {
    const cartItem = await cartModel.findById(id);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart Item Not Found" });
    }

    if (type === "addCart") {
      cartItem.productQuantity += 1; // Increase by 1
    } else if (type === "subCart") {
      if (cartItem.productQuantity > 1) {
        cartItem.productQuantity -= 1; // Decrease by 1
      } else {
        return res.status(400).json({ error: "Invalid operation type" });
      }
    } else {
      return res.status(400).json({ error: "Invalid operation type" });
    }

    await cartItem.save();

    res.status(200).json({ message: `The Product Quantity updated` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAllCartProduct = async (req, res) => {
  try {
    const tasks = await cartModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Task Not Found" });
//   }
//   try {
//     const product = await ProductModel.findByIdAndDelete(id);

//     res.status(200).json({ message: "Product deleted Successfully" });
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// };

const createOrderFromCart = async (req, res) => {
  try {
    const cartItems = await CartModel.find();

    const order = await OrderModel.create({
      products: cartItems.map((item) => ({
        productTitle: item.productTitle,
        productPrice: item.productPrice,
        quantity: item.productQuantity,
        totalPrice: item.prodTotalQuantityPrice,
      })),
      totalQuantity: cartItems.reduce(
        (total, item) => total + item.productQuantity,
        0
      ),
      totalCost: cartItems.reduce(
        (total, item) => total + item.prodTotalQuantityPrice,
        0
      ),
      orderedDate: new Date(),
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProductCart,
  updateProdQuantity,
  getAllCartProduct,
  createOrderFromCart,
};
