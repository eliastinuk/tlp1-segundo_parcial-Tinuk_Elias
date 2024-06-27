const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];
let currentId = 1;

// aca obtenemos la lista completa de los libros
app.get('/books', (req, res) => {
    res.json(books);
});

// obtenemos el libro por su id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('El libro no se encontró');
    }
});

// este es el post para agregar un libro
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).send('faltan datos');
    }

    const newBook = { id: currentId++, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});

