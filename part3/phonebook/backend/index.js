const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("build"));

morgan.token("body", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : null;
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (persons.map((person) => person.name).includes(body.name)) {
    res.statusMessage = "Name must be unique";
    res.status(400).end();
  } else if (!body.name) {
    res.statusMessage = "Name is missing";
    res.status(400).end();
  } else if (!body.number) {
    res.statusMessage = "Number is missing";
    res.status(400).end();
  } else {
    const person = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);

    res.json(person);
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) res.json(person);

  res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `;
  res.send(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
