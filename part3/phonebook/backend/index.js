const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
// app.use(morgan('tiny'));
// morgan.token('data', (req, res) =>  req.method === 'POST' ? JSON.stringify(req.body) : '');
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

let persons = [].concat(require('./data/persons').persons);

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
        return res.status(404).json({ error: `person ${id} was not found` }).end();

    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);
    res.status(204).end(); // 204 No Content - even if person was not found
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number)
        return res.status(400).json({ error: 'name or number missing' });

    if (persons.find(person => person.name === body.name))
        return res.status(400).json({ error: 'name must be unique' });

    const person = {
        id: Math.floor(Math.random() * 100000000).toString(),
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);
    res.json(person);
});

const PORT = process.env.port || 3001;
app.listen(PORT);