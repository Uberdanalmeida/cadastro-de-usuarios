import { useState, useEffect } from "react";
import { HiUser, HiMail, HiTrash } from "react-icons/hi";

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState(() => {
  const dadosSalvos = localStorage.getItem("usuarios");
  return dadosSalvos ? JSON.parse(dadosSalvos) : [];
});

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  function handleSubmit(event) {
    event.preventDefault();

    setUsuarios([...usuarios, { nome, email, senha }]);
  }

  function removerUsuario(index) {
    const novaLista = usuarios.filter((usuario, i) => i !== index);
    setUsuarios(novaLista);
  }

  return (
    <div className="App">
      <h2 className="titulo-lista">Cadastro de Usuários</h2>

      <form action="">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Cadastrar
        </button>
      </form>

      {usuarios.length > 0 && (
        <div className="usuarios-cadastrados">
          {usuarios.map((usuario, index) => (

          <div className="usuario" key={index}>
              <span><HiUser /> {usuario.nome}</span>
              <span><HiMail /> {usuario.email}</span>
              <span className="lixeira" onClick={() => removerUsuario(index)}>
                <HiTrash />
              </span>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
}
