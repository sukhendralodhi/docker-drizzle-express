const express = require("express");
const Router = express.Router();
const bookController = require("../controllers/book.controller.js");

Router.get("/", bookController.getAllBooks);
Router.get("/:id", bookController.getBookById);
Router.post("/", bookController.createBook);
Router.put("/:id", bookController.updateBook);
Router.delete("/:id", bookController.deleteBook);

module.exports = Router;
