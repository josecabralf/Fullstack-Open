require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// const morgan = require('morgan');
// app.use(morgan('tiny'));
// morgan.token('data', (req, res) =>  req.method === 'POST' ? JSON.stringify(req.body) : '');
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    );
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons));
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => res.json(person));
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => res.status(204).end());
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number)
        return res.status(400).json({ error: 'name or number missing' });

    // if (persons.find(person => person.name === body.name))
    //     return res.status(400).json({ error: 'name must be unique' });

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(result => res.json(result));
});

const PORT = process.env.port || 3001;
app.listen(PORT);