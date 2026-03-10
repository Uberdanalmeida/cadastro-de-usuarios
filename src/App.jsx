import { useState } from 'react';

export default function App() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    setUsuarios([...usuarios, { nome, email, senha }]);
  }

  return(
    <div className="App">
      <h1>Cadastro de Usuários</h1>

      <form action="">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Cadastrar
        </button>
      </form>

      <div className="usuarios-cadastrados">
        <p>Usuários cadastrados:</p>
        {usuarios.map((usuario, index) => (
          <p key={index}>{usuario.nome} - {usuario.email}</p>
        ))}
      </div>
    </div>
  )
}