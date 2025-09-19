import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Link } from "react-router-dom";

function Write() {
  const [controlState, setControlState] = useState(false);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [cycle, setCycle] = useState(1); // valor padrão: diário
  const [duration, setDuration] = useState(""); // duração em minutos
  const db = getDatabase(app);
  const controlRef = ref(db, "test/control");

  // Lê o valor atual ao carregar o componente
  useEffect(() => {
    const unsubscribe = onValue(controlRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === "boolean") {
        setControlState(value);
      }
    });

    return () => unsubscribe();
  }, [controlRef]);

  // Alterna o valor atual (toggle)
  const toggleControl = async () => {
    try {
      await set(controlRef, !controlState);
      console.log("Valor atualizado para:", !controlState);
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
    }
  };
  const updateValue = async (e) => {
    e.preventDefault();

    try {
      await set(ref(db, "test/day"), Number(day));
      await set(ref(db, "test/month"), Number(month));
      await set(ref(db, "test/year"), Number(year));
      await set(ref(db, "test/hour"), Number(hour));
      await set(ref(db, "test/minute"), Number(minute));
      await set(ref(db, "test/second"), Number(second));
      await set(ref(db, "test/cycle"), Number(cycle));
      await set(ref(db, "test/duration"), Number(duration));

      alert("Acionamento definido com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      {/* Botão Voltar */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000,
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#ffffff",
              color: "#0053A0",
              border: "2px solid #0053A0",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            ⬅️ Voltar
          </button>
        </div>
      </Link>

      {/* Título e Status */}
      <h1 style={{ marginBottom: "10px", color: "#0053A0" }}>
        ⚙️ Controle Remoto da Horta
      </h1>
      <p style={{ marginBottom: "20px", fontSize: "16px" }}>
        Status atual da válvula:
        <strong
          style={{
            marginLeft: "10px",
            color: controlState ? "#27ae60" : "#e74c3c",
          }}
        >
          {controlState ? "Ligada" : "Desligada"}
        </strong>
      </p>

      {/* Botão Liga/Desliga */}
      <button
        onClick={toggleControl}
        style={{
          padding: "10px 25px",
          fontSize: "16px",
          backgroundColor: controlState ? "#e74c3c" : "#0053A0",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {controlState ? "Desligar Válvula" : "Ligar Válvula"}
      </button>

      {/* Formulário Data e Hora */}
      <form
        onSubmit={updateValue}
        style={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h3 style={{ marginBottom: "5px", color: "#003B70" }}>
          Definir acionamento
        </h3>

        {[
          { label: "Dia", value: day, set: setDay },
          { label: "Mês", value: month, set: setMonth },
          { label: "Ano", value: year, set: setYear },
          { label: "Hora", value: hour, set: setHour },
          { label: "Minuto", value: minute, set: setMinute },
          { label: "Segundo", value: second, set: setSecond },
        ].map(({ label, value, set }, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ flex: 1 }}>{label}:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => set(e.target.value)}
              style={{
                flex: 1.2,
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}
        {/* Campo Duração da Irrigação */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label style={{ flex: 1 }}>Duração da Irrigação (min):</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              flex: 1.2,
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label style={{ flex: 1 }}>Ciclo:</label>
          <select
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            style={{
              flex: 1.2,
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value={1}>Diário</option>
            <option value={2}>Semanal</option>
            <option value={3}>Mensal</option>
          </select>
        </div>

        {/* Botão Salvar */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FFC700",
            color: "#003B70",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          💾 Salvar
        </button>
      </form>
    </div>
  );
}

export default Write;
