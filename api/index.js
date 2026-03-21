import express from 'express';

const app = express();
app.use(express.json());

let usuarios = []

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const novoUsuario = { id: usuarios.length + 1, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});