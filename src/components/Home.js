import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🌱 Bem-vindo à Horta Escolar</h1>
      <p>Escolha uma opção abaixo:</p>

      <div style={{ marginTop: '30px' }}>
        <Link to="/read">
          <button style={{ padding: '10px 20px', margin: '10px' }}>📖 Ler Dados</button>
        </Link>
        <Link to="/write">
          <button style={{ padding: '10px 20px', margin: '10px' }}>✍️ Escrever Dados</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
