const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.post("/", createProduct);

router.get("/", getAllProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
