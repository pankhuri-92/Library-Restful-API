const express = require('express');
const router = express.Router();

let books = []; // In-memory book array
let idCounter = 1;

// Create a book (POST)
router.post('/', (req, res) => {
    const { title, author, isbn } = req.body;
    const newBook = { id: idCounter++, title, author, isbn };
    books.push(newBook);
    res.status(201).json({ message: 'Book added', book: newBook });
});

// Get all books (GET)
router.get('/', (req, res) => {
    res.json(books);
});

// Get book by ID (GET)
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

// Update book by ID (PUT)
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { title, author, isbn } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;

    res.json({ message: 'Book updated', book });
});

// Delete book by ID (DELETE)
router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });

    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
});

module.exports = router;
