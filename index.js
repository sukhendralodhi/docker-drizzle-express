const dotenv = require('dotenv');
const express = require('express');
const bookRoutes = require('./routes/book.routes.js');
const authorRoutes = require('./routes/author.routes.js');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
