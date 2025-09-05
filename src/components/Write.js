import React, { useState, useEffect } from 'react'
import  app  from '../firebaseConfig'
import { getDatabase, ref, onValue, set } from 'firebase/database'

function Write() {
  const [controlState, setControlState] = useState(false)
  const [day, setDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const [hour, setHour] = useState(null)
  const [minute, setMinute] = useState(null)
  const [second, setSecond] = useState(null)
  const db = getDatabase(app)
  const controlRef = ref(db, 'test/control')
  const dayRef = ref(db, 'test/day')
  const monthRef = ref(db, 'test/month')
  const yearRef = ref(db, 'test/year')
  const hourRef = ref(db, 'test/hour')
  const minuteRef = ref(db, 'test/minute')
  const secondRef = ref(db, 'test/second')

  // Lê o valor atual ao carregar o componente
  useEffect(() => {
    const unsubscribe = onValue(controlRef, (snapshot) => {
      const value = snapshot.val()
      if (typeof value === 'boolean') {
        setControlState(value)
      }
    })
    onValue(dayRef, (snapshot) => {
      const value = snapshot.val()
      setDay(value)
    })
    onValue(monthRef, (snapshot) => {
      const value = snapshot.val()
      setMonth(value)
    })
    onValue(yearRef, (snapshot) => {
      const value = snapshot.val()
      setYear(value)
    })
    onValue(hourRef, (snapshot) => {
      const value = snapshot.val()
      setHour(value)
    })
    onValue(minuteRef, (snapshot) => {
      const value = snapshot.val()
      setMinute(value)
    })
    onValue(secondRef, (snapshot) => {
      const value = snapshot.val()
      setSecond(value)
    })

    // Limpa o listener ao desmontar o componente

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
  const updateValue = async (e) => {
    e.preventDefault()

    try {
      await set(ref(db, 'test/day'), Number(day))
      await set(ref(db, 'test/month'), Number(month))
      await set(ref(db, 'test/year'), Number(year))
      await set(ref(db, 'test/hour'), Number(hour))
      await set(ref(db, 'test/minute'), Number(minute))
      await set(ref(db, 'test/second'), Number(second))

      alert('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  return (
    <div>
      <h1>Controle Remoto</h1>
      <p>Status atual: <strong>{controlState ? 'ON (true)' : 'OFF (false)'}</strong></p>
      <button onClick={toggleControl}>
        {controlState ? 'Desligar (Setar False)' : 'Ligar (Setar True)'}
      </button>
      <form onSubmit={updateValue}>
        <label>
          Dia:
          <input type="number" value={day} onChange={(e) => setDay(e.target.value)} />
        </label><br />

        <label>
          Mês:
          <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
        </label><br />

        <label>
          Ano:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label><br />

        <label>
          Hora:
          <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} />
        </label><br />

        <label>
          Minuto:
          <input type="number" value={minute} onChange={(e) => setMinute(e.target.value)} />
        </label><br />

        <label>
          Segundo:
          <input type="number" value={second} onChange={(e) => setSecond(e.target.value)} />
        </label><br />

        <button type="submit">Salvar Dados</button>
      </form>    
      </div>
    
  )
}

export default Write
