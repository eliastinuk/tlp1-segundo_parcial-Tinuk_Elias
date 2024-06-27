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

// este es el put para actualizar los datos
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('el libro no se encontró');
    }

    const { title, author, year } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;

    res.json(book);
});

// este es el delete para eliminar un libro
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('el libro no se encontró');
    }

    books.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});




