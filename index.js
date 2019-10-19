/* 

RocketSeat | GoStack | Bootcamp
Desafio 1: Conceitos do NodeJS

Crie uma aplicação para armazenar projetos e suas tarefas do zero utilizando Express.

** ROTAS **
- POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.
- GET /projects: Rota que lista todos projetos e suas tarefas;
- PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
- DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
- POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;

*/

const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let requests = 0;

server.use((req, res, next) => {
  requests++;

  next();

  if (requests == 1) {
    console.log(`${requests} request so far`);
  } else {
    console.log(`${requests} requests so far`);
  }
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(idx => idx.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found, try again" });
  }

  return next();
}

// Lista todos projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Cria um projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

// Cria uma tarefa em um projeto
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex(idx => idx.id == id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

// Atualiza projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = projects.findIndex(idx => idx.id == id);

  projects[index].title = title;

  return res.json(projects);
});

// Deleta projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(idx => idx.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.listen(3000);
