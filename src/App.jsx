import { useState, useEffect } from "react";
import "./index.css";
import { HiUser, HiMail, HiTrash } from "react-icons/hi";
import axios from "axios";

// Defina a URL base para facilitar
const api = axios.create({ baseURL: "http://127.0.0.1:3001" });

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // 1. Carregar usuários apenas ao montar o componente
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const resposta = await api.get("/usuarios");
        setUsuarios(resposta.data);
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
      const resposta = await api.post("/usuarios", novoUsuario);
      // Atualiza a lista com o que veio do servidor (que contém o ID)
      setUsuarios([...usuarios, resposta.data]);

      // Limpar campos
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
    }
  }

  async function removerUsuario(id) {
    try {
      // 1. Avisa o servidor para deletar
      await api.delete(`/usuarios/${id}`);

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
