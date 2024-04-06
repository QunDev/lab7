import {
  getAllCategories,
  getCategory,
  addCategory,
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

export default Route;
