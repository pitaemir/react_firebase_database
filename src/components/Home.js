import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '60px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ color: '#005aa7', fontSize: '32px', marginBottom: '10px' }}>
        🌱 Bem-vindo à Horta Escolar do Sesc
      </h1>

      <p style={{ fontSize: '18px', color: '#333' }}>
        Escolha uma opção abaixo para continuar:
      </p>

      <div style={{ marginTop: '40px' }}>
        <Link to="/read">
          <button style={{
            backgroundColor: '#005aa7',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '8px',
            fontSize: '16px',
            margin: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            📖 Ler Dados
          </button>
        </Link>

        <Link to="/write">
          <button style={{
            backgroundColor: '#ffcc00',
            color: '#000',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '8px',
            fontSize: '16px',
            margin: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            ✍️ Escrever Dados
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
