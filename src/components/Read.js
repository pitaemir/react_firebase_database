import React, { useState } from 'react'
import app from '../firebaseConfig'
import { getDatabase, ref, get } from 'firebase/database'

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
    <div>
      <h1>Leitura de Dados do Firebase</h1>
      <button onClick={fetchData}>Buscar Dados</button>

      {data && (
        <ul>
          <li><strong>Data:</strong> {data.day}/{data.month}/{data.year}</li>
          <li><strong>Hora:</strong> {data.hour}:{data.minute}:{data.second}</li>
          <li><strong>Temperatura:</strong> {data.temperature} °C</li>
          <li><strong>Pressão:</strong> {data.pressure} hPa</li>
          <li><strong>Controle da Válvula:</strong> {data.control ? 'Ligada' : 'Desligada'}</li>
        </ul>
      )}
    </div>
  )
}

export default Read
