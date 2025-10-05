
const {pgTable, uuid, varchar, integer, text} = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text({ length: 500 }),
    authorId: uuid().references(() => authorsTable.id).notNull(),
});

module.exports = booksTable;