const express = require("express");
const app = express();

require("dotenv").config();

const Person = require("./models/person");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(express.static("build"));
app.use(express.json());

app.get("/info", (req, res) => {
  Person.find({}).then((people) => {
    const info = `
    <p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}</p>
    `;
    res.send(info);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find().then((people) => {
    res.json(people);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  Person.find().then((people) => {
    if (!body.name) {
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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "missing person" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  if (body.number) {
    const person = {
      name: body.name,
      number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then((person) => {
        res.json(person);
      })
      .catch((error) => next(error));
  } else {
    res.status(400).send({ error: "number is missing" });
  }
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
