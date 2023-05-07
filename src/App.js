import './App.css';
import { useState } from 'react'

function App() {

  const [endereco, setEndereco] = useState({})

  function manipulaEndereco (evento) {

    const cep = evento.target.value

    setEndereco({
      cep
    })

    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => {
            return {...enderecoAntigo,
            cep: dados.cep,
            cidade: dados.localidade,
            estado: dados.uf,
            ddd: dados.ddd
          }
        })
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Digite o CEP' onChange={manipulaEndereco} className='campoTexto' />
        <ul>
          <li>
            CEP: {endereco.cep}
          </li>
          <li>
            Cidade: {endereco.cidade}
          </li>
          <li>
            Estado: {endereco.estado}
          </li>
          <li>
            DDD: {endereco.ddd}
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
