const booksTable = require("../models/book.model.js");
const db = require("../db/index.js");
const { eq } = require("drizzle-orm");


exports.getAllBooks = async function (req, res) {
    console.log("Fetching all books", db);
    try {
        console.log("Fetching all books");
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
        console.error("Error fetching books:", error);
        return res
            .status(500)
            .json({
                error: "An error occurred while retrieving books"
            });
    }
}

exports.getBookById = async function (req, res) {
    const bookId = (req.params.id);

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
    const bookId = (req.params.id);
    console.log(bookId);

    try {
        const result = await db
            .delete(booksTable)
            .where(eq(booksTable.id, bookId)) // <-- pass eq() directly
            .returning({ id: booksTable.id });
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

exports.updateBook = async function (req, res) {
    const bookId = (req.params.id);
    const { title, description, authorId } = req.body;

    console.log(title, description, authorId);
    

    if (!title || title === "" || !authorId || authorId === "") {
        return res
            .status(400)
            .json({
                error: "Title and Author ID are required"
            });
    }
    try {
        // Update the book record
        const result = await db
            .update(booksTable)
            .set({ title, description, authorId })
            .where(eq(booksTable.id, bookId))
            .returning({
                id: booksTable.id,
                title: booksTable.title,
                description: booksTable.description,
                authorId: booksTable.authorId,
            });

        // If no record updated
        if (!result.length) {
            return res.status(404).json({ error: `Book not found for ID ${bookId}` });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            data: result[0],
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({
            error: "An error occurred while updating the book",
        });
    }
};
