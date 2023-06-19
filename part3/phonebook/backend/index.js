const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

const Person = require("./models/person");

const unknownEndpoint = (req, res) => {
  res.status(404).send("unknown endpoint");
};

app.use(express.static("build"));
app.use(express.json());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  Person.find({}).then((people) => {
    if (people.map((person) => person.name).includes(body.name)) {
      res.status(400).send({ error: "name must be unique" });
    } else if (!body.name) {
      res.status(400).send({ error: "name is missing" });
    } else if (!body.number) {
      res.status(400).send({ error: "number is missing" });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person.save().then((person) => {
        res.json(person);
      });
    }
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "missing person" });
      }
    })
    .catch((error) => {
      res.json({ error: "invalid request" });
    });
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

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
