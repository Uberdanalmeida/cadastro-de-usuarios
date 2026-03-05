export default function App() {
  return(
    <div className="App">
      <h1>Cadastro de Usuários</h1>

      <form action="">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" name="idade" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}