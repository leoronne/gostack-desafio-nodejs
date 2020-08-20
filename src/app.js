const express = require("express");
const cors = require("cors");
const uuid = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  try {
    return res.status(201).json(repositories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/repositories", (req, res) => {
  try {
    const { url, title, techs } = req.body;
    const id = uuid.uuid();
    repositories.push({
      id,
      url,
      title,
      techs,
      likes: 0,
    });
    return res
      .status(201)
      .json(repositories[repositories.findIndex((repo) => repo.id === id)]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.put("/repositories/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, techs } = req.body;
    const index = repositories.findIndex((repo) => repo.id === id);
    if (index === -1)
      return res.status(400).json({ message: "Repo not found" });

    repositories[index].url = url;
    repositories[index].title = title;
    repositories[index].techs = techs;

    return res.status(200).json(repositories[index]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete("/repositories/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = repositories.findIndex((repo) => repo.id === id);
    if (index === -1)
      return res.status(400).json({ message: "Repo not found" });
    repositories.splice(index, 1);

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/repositories/:id/like", (req, res) => {
  try {
    const { id } = req.params;
    const index = repositories.findIndex((repo) => repo.id === id);
    if (index === -1)
      return res.status(400).json({ message: "Repo not found" });

    repositories[index].likes += 1;

    return res.status(201).json(repositories[index]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = app;
