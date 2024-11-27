const express = require('express');
const app = express();

app.use(express.json());

const persons = require('./data/persons').persons;

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    );
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port http://localhost:${PORT}/`);