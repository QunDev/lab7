import {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} from "../Controllers/Categories.js";

import checkAuthor from "../Middleware/Permission.js";
import { validationCategory } from "../Validation/Validation.js";

import express from "express";

const Route = express.Router();

Route.get("/", (req, res) => {
  getAllCategories(req, res);
});

Route.get("/:id", (req, res) => {
  getCategory(req, res);
});

Route.post("/", checkAuthor, validationCategory, (req, res) => {
  addCategory(req, res);
});

Route.put("/:id", checkAuthor, (req, res) => {
  editCategory(req, res);
});

Route.delete("/:id", checkAuthor, (req, res) => {
  deleteCategory(req, res);
});

export default Route;
