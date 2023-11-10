const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const MongoURI = process.env.MONGO_URI;
const productRoutes = require("./routes/ProductRoute");
const orderRoutes = require("./routes/orderRoute");
///// middleware //////////

app.use((req, res, next) => {
  console.log("Path " + req.path + " method " + req.method);
  next();
});

app.use(express.json());

mongoose
  .connect(MongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log("DB Connected Successfully listening to " + port);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);
