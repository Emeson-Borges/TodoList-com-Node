const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Lista de tarefas (em memória)
let todos = [
  { id: 1, task: 'Estudar Node.js', completed: false },
  { id: 2, task: 'Criar uma API simples', completed: false }
];

// Rota para obter todas as tarefas
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Rota para obter uma tarefa pelo ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Rota para adicionar uma nova tarefa
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Rota para atualizar uma tarefa pelo ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Rota para deletar uma tarefa pelo ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Rota para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
