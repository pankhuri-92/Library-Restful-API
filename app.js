const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');

app.use(express.json()); // To parse JSON request bodies
app.use('/books', booksRoutes); // All routes start with /books

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
