import express from "express";

import {
  validationProduct,
  validationProductUpdate,
} from "../Validation/Validation.js";

import {
  getAllProducts,
  addProduct,
  getProduct,
  editProduct,
} from "../Controllers/Product.js";
import checkAuthor from "../Middleware/Permission.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  getAllProducts(req, res);
});

Router.get("/:id", (req, res) => {
  getProduct(req, res);
});

Router.post("/", checkAuthor, validationProduct, (req, res) => {
  addProduct(req, res);
});

Router.put("/:id", checkAuthor, validationProductUpdate, (req, res) => {
  editProduct(req, res);
});

export default Router;
