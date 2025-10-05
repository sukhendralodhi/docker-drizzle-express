const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});