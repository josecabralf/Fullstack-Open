const express = require('express');
const app = express();

app.use(express.json());

let persons = require('./data/persons').persons;

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    );
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (!person)
        return res.status(404).end();

    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);
    res.status(204).end(); // 204 No Content - even if person was not found
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port http://localhost:${PORT}/`);