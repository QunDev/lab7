import express from "express";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { validationUser } from "./Validation/Validation.js";

import routerProduct from "./Routes/Product.js";
import routerUser from "./Routes/User.js";
import routerCategory from "./Routes/Category.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.json());

app.use("/product", routerProduct);
app.use("/auth", validationUser, routerUser);
app.use("/category", routerCategory);

mongoose
  .connect(process.env.MONGODB_URI + process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, process.env.HOST_ALLOW, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
