require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');

const app = express();

const Person = require('./models/person');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
// app.use(morgan('tiny'));
// morgan.token('data', (req, res) =>  req.method === 'POST' ? JSON.stringify(req.body) : '');
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/info', (req, res) => {
    const date = new Date();
    Person.countDocuments({})
        .then(count => res.send(
            `<p>Phonebook has info for ${count} people</p>
            <p>${date}</p>`
        ))
        .catch(e => next(e));
});

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(e => next(e));
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) 
                res.json(person);
            else 
                res.status(404).end();
        })
        .catch(e => next(e));
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(e => next(e));
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number)
        return res.status(400).json({ error: 'name or number missing' });

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then(result => res.json(result))
        .catch(e => next(e));
});

app.put('/api/persons/:id', (req, res) => {
    const body = req.body;
    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(e => next(e));
});

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'unknown endpoint' });
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError')
      return response.status(400).send({ error: 'malformatted id' })
  
    next(error);
}
app.use(errorHandler)

const PORT = process.env.port || 3001;
app.listen(PORT);