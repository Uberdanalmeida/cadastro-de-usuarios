import { useState, useEffect } from "react";
import "./index.css";
import { HiUser, HiMail, HiTrash } from "react-icons/hi";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = "https://ogayxnupzfaqkihhadml.supabase.co";
const supabaseKey = "sb_publishable_lPl8Ga51daNlXdjC9soU0g_R-Z6fwDt";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // 1. Carregar usuários apenas ao montar o componente
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const { data } = await supabase.from("usuarios").select("*");
        setUsuarios(data || []);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    }
    carregarUsuarios();
  }, []); // Array vazio aqui!

  async function handleSubmit(event) {
    event.preventDefault();

    const novoUsuario = { nome, email, senha };

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .insert([novoUsuario])
        .select();

      if (error) throw error;

      // Atualiza a lista com o que veio do servidor (que contém o ID)
      setUsuarios([...usuarios, data[0]]);

      // Limpar campos
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      alert("Erro ao cadastrar usuário: " + error.message);
    }
  }

  async function removerUsuario(id) {
    try {
      // 1. Avisa o servidor para deletar
      const { error } = await supabase.from("usuarios").delete().eq("id", id);

      if (error) throw error;

      // 2. Atualiza a tela removendo o usuário da lista
      const novaLista = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(novaLista);
    } catch (error) {
      alert("Erro ao remover usuário do servidor");
    }
  }

  return (
    <div className="App">
      <h2 className="titulo-lista">Cadastro de Usuários</h2>

      <form onSubmit={handleSubmit}>
        {" "}
        {/* Use onSubmit no form, não onClick no button */}
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      {usuarios.length > 0 && (
        <div className="usuarios-cadastrados">
          {usuarios.map((usuario) => (
            <div className="usuario" key={usuario.id}>
              {" "}
              {/* Use o ID do banco, não o index */}
              <span>
                <HiUser /> {usuario.nome}
              </span>
              <span>
                <HiMail /> {usuario.email}
              </span>
              <span
                className="lixeira"
                onClick={() => removerUsuario(usuario.id)}
              >
                <HiTrash />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
