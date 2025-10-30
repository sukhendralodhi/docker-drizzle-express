const express = require("express");
const Router = express.Router();
const authorController = require("../controllers/author.controller.js");

Router.get("/", authorController.getAllAuthors);
Router.get("/:id", authorController.getAuthorById);
Router.post("/", authorController.createAuthor);
Router.delete("/:id", authorController.deleteAuthor);
Router.put("/:id", authorController.updateAuthor);
Router.get('/:id/books', authorController.getAllBooksOfOther);

module.exports = Router;