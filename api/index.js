import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

import "dotenv/config"; // Isso carrega o arquivo .env automaticamente

const app = express();
app.use(express.json());
app.use(cors());

// Agora, em vez de colar o texto direto, você usa o process.env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// LISTAR USUÁRIOS
app.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// CADASTRAR USUÁRIO
app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, senha }])
    .select();

  if (error) return res.status(400).json(error);
  res.status(201).json(data[0]);
});

// DELETAR USUÁRIO
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) return res.status(400).json(error);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log("Servidor conectado ao Supabase na porta 3001");
});
