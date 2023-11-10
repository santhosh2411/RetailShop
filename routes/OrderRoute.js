const express = require("express");

const router = express.Router();

const {
  addProductCart,
  updateProdQuantity,
  getAllCartProduct,
  createOrderFromCart,
} = require("../controllers/CartController");

router.post("/", addProductCart);

router.patch("/", updateProdQuantity);

router.get("/", getAllCartProduct);

router.post("/", createOrderFromCart);

module.exports = router;
