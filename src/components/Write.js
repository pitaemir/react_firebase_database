import React, { useState, useEffect } from 'react'
import  app  from '../firebaseConfig'
import { getDatabase, ref, onValue, set } from 'firebase/database'

function Write() {
  const [controlState, setControlState] = useState(false)
  const db = getDatabase(app)
  const controlRef = ref(db, 'test/control')

  // Lê o valor atual ao carregar o componente
  useEffect(() => {
    const unsubscribe = onValue(controlRef, (snapshot) => {
      const value = snapshot.val()
      if (typeof value === 'boolean') {
        setControlState(value)
      }
    })

    return () => unsubscribe()
  }, [])

  // Alterna o valor atual (toggle)
  const toggleControl = async () => {
    try {
      await set(controlRef, !controlState)
      console.log('Valor atualizado para:', !controlState)
    } catch (error) {
      console.error('Erro ao atualizar valor:', error)
    }
  }

  return (
    <div>
      <h1>Controle Remoto</h1>
      <p>Status atual: <strong>{controlState ? 'ON (true)' : 'OFF (false)'}</strong></p>
      <button onClick={toggleControl}>
        {controlState ? 'Desligar (Setar False)' : 'Ligar (Setar True)'}
      </button>
    </div>
  )
}

export default Write
