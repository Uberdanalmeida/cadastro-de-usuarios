import express from 'express';
import cors from 'cors'; // Importante adicionar

const app = express();
app.use(express.json());
app.use(cors()); // Permite que o React acesse a API

let usuarios = [];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  const novoUsuario = { id: Date.now(), nome, email, senha }; // id único melhor
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  usuarios = usuarios.filter(u => u.id !== Number(id));
  res.status(204).send();
});

// Mudando para 3001 para evitar conflito com portas padrão de frontend
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});