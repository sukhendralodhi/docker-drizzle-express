const { eq } = require("drizzle-orm");
const db = require("../db/index.js");
const authorsTable = require("../models/author.model.js");

exports.getAllAuthors = async function (req, res) {
    console.log("Fetching all authors");
    try {
        const authors = await db.select().from(authorsTable);
        console.log(`Fetched ${authors.length} authors`);
        return res.status(200).json({
            message: "Authors retrieved successfully",
            data: authors
        });
    } catch (error) {
        console.error("Error fetching authors:", error);
        return res.status(500).json({
            error: "An error occurred while retrieving authors"
        });
    }
};

exports.getAuthorById = async function (req, res) {
    const authorId = req.params.id;
    try {
        const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, authorId)).limit(1);
        if (!author) {
            return res.status(404).json({
                error: "Author not found for ID " + authorId
            });
        }
        return res.status(200).json({
            message: "Author retrieved successfully By ID",
            data: author
        });
    } catch (error) {
        console.error("Error fetching author:", error);
        return res.status(500).json({
            error: "An error occurred while retrieving the author"
        });
    }
}

exports.createAuthor = async function (req, res) {
    const { firstName, lastName, email } = req.body;
    console.log("Creating author with data:", req.body);
    try {
        if(!firstName || firstName.trim() === "" || !email || email.trim() === "") {
            return res.status(400).json({
                error: "First name and email are required"
            });
        }

        const [result] = await db.insert(authorsTable).values(
            {
                firstName: firstName.trim(),
                lastName: lastName ? lastName.trim() : null,
                email: email.trim()
            }
        ).returning(
            {id: authorsTable.id}
        );

        return res.status(201).json({
            message: "Author created successfully",
            data: { id: result.id }
        });

    } catch (error) {
        console.error("Error creating author:", error);
        return res.status(500).json({
            error: "An error occurred while creating the author"
        });
    }
    // return res.status(201).json({
    //     message: "Author created successfully",
    //     data: req.body
    // });
}

exports.deleteAuthor = async function (req, res) {

}

exports.updateAuthor = async function (req, res) {

}