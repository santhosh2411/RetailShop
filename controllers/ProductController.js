const mongoose = require("mongoose");
const ProductModel = require("../models/ProductModel");

///// To create a task Post

const createProduct = async (req, res) => {
  console.log("11111");
  const { productTitle, productPrice, productDetails } = req.body;
  try {
    const addProduct = await ProductModel.create({
      productTitle,
      productPrice,
      productDetails,
    });
    res.status(200).json(addProduct);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const product = await ProductModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json({ message: `The Product with id : ${id} is updated` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const tasks = await ProductModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product Not Found" });
  }
  try {
    const product = await ProductModel.findById({
      _id: id,
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const product = await ProductModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
