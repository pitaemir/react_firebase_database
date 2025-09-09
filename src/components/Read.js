import React, { useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase, ref, get } from 'firebase/database'
import { Link } from 'react-router-dom'

function Read() {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const db = getDatabase(app)
    const dataRef = ref(db, 'test')
    const snapshot = await get(dataRef)
    if (snapshot.exists()) {
      setData(snapshot.val())  // aqui mantemos o objeto com as chaves
      console.log(snapshot.val())
    } else {
      console.log('No data available')
      alert('No data available')
    }
  }

  return (
<div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'white',
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      {/* Botão Voltar */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000
        }}>
          <button
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              color: '#0053A0',
              border: '2px solid #0053A0',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0px 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            ⬅️ Voltar
          </button>
        </div>
      </Link>

      {/* Título e instrução */}
      <h1 style={{ marginBottom: '10px', color: '#0053A0' }}>🌾 Leitura de Dados da Horta</h1>
      <p style={{ marginBottom: '20px', fontSize: '16px', color: '#2d3436' }}>
        Clique no botão abaixo para buscar os dados do Firebase.
      </p>

      {/* Botão Buscar */}
      <button
        onClick={fetchData}
        style={{
          padding: '10px 25px',
          fontSize: '16px',
          backgroundColor: '#FFC700',
          color: '#003B70',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '30px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          fontWeight: 'bold'
        }}
      >
        🔄 Buscar Dados
      </button>

      {/* Dados carregados */}
      {data && (
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
          width: '320px',
          textAlign: 'left',
          color: '#2d3436'
        }}>
          <p><strong>📅 Data:</strong> {data.day}/{data.month}/{data.year}</p>
          <p><strong>⏰ Hora:</strong> {data.hour}:{data.minute}:{data.second}</p>
          <p><strong>🌡️ Temperatura:</strong> {data.temperature} °C</p>
          <p><strong>🌬️ Pressão:</strong> {data.pressure} hPa</p>
          <p><strong>💧 Válvula:</strong> 
            <span style={{ marginLeft: '5px', color: data.control ? '#27ae60' : '#e74c3c' }}>
              {data.control ? 'Ligada' : 'Desligada'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Read
