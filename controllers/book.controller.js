const booksTable = require("../models/book.model.js");
const db = require("../db.js");
const { eq } = require("drizzle-orm");


exports.getAllBooks = async function (req, res) {
    try {
        const books = await db.select().from(booksTable);
        return res
            .status(200)
            .json(
                {
                    message: "Books retrieved successfully",
                    data: books
                }
            );
    } catch (error) {
        return res
            .status(500)
            .json({
                error: "An error occurred while retrieving books"
            });
    }
}

exports.getBookById = async function (req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
        return res
            .status(400)
            .json({
                error: "Invalid book ID"
            });
    }

    const [book] = await db.select().from(booksTable).where((table) => eq(table.id, bookId)).limit(1);
    if (!book) {
        return res
            .status(404)
            .json({
                error: "Book not found for ID " + bookId
            });
    }

    return res
        .status(200)
        .json(
            {
                message: "Book found",
                data: book
            }
        );
}

exports.createBook = async function (req, res) {
    const { title, description, authorId } = req.body;
    if (!title || title === "" || !authorId || authorId === "") {
        return res
            .status(400)
            .json({
                error: "Title and Author ID are required"
            });
    }
    try {
        const [result] = await db.insert(booksTable).values({
            title,
            description,
            authorId
        }).returning({
            id: booksTable.id,
        });

        return res
            .status(201)
            .json(
                {
                    message: "Book created successfully",
                    bookId: result.id
                }
            );

    } catch (error) {
        return res
            .status(500)
            .json({
                error: "An error occurred while creating the book"
            });
    }

}

exports.deleteBook = async function (req, res) {
    const bookId = parseInt(req.params.id, 10);
    
    if (isNaN(bookId)) {
        return res
            .status(400)
            .json({
                error: "Invalid book ID"
            });
    }

    try {
        const result = await db.delete(booksTable).where((table) => eq(table.id, bookId));
        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({
                    error: "Book not found for ID " + bookId
                });
        }

        return res
            .status(200)
            .json({
                message: "Book deleted successfully"
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                error: "An error occurred while deleting the book"
            });
    }
}