import { login, register } from "../Controllers/Users.js";

import express from "express";

const Router = express.Router();

Router.post("/register", (req, res) => {
  register(req, res);
});

Router.post("/login", (req, res) => {
  login(req, res);
});

export default Router;
