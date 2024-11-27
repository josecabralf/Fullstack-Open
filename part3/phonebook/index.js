const express = require('express');
const app = express();

app.use(express.json());

const persons = require('./data/persons').persons;

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}/`)