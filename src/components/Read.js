import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [flowRate, setFlowRate] = useState(null);
  const [totalMilliliters, setTotalMilliLitres] = useState(null);

  const db = getDatabase(app);

  // Lê automaticamente temperatura e pressão ao carregar
  useEffect(() => {
    const tempRef = ref(db, "test/temperature");
    const pressRef = ref(db, "test/pressure");
    const flowRef = ref(db, "test/flowRate");
    const totalRef = ref(db, "test/totalMilliliters");

    const unsubscribeTemp = onValue(tempRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === "number")  setTemperature(value);
      
    });

    const unsubscribePress = onValue(pressRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === "number") setPressure(value);
      
    });
    const unsubscribeFlow = onValue(flowRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === "number") setFlowRate(value);
    });

    const unsubscribeTotal = onValue(totalRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === "number") setTotalMilliLitres(value);
    });
    return () => {
      unsubscribeTemp();
      unsubscribePress();
      unsubscribeFlow();
      unsubscribeTotal();
    };
  }, [db]);

  // Busca os demais dados (data/hora e válvula)
  const fetchData = async () => {
    const dataRef = ref(db, "test");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(snapshot.val());
      console.log(snapshot.val());
    } else {
      console.log("No data available");
      alert("No data available");
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

      {/* Título e instrução */}
      <h1 style={{ marginBottom: "10px", color: "#0053A0" }}>
        Leitura da última definição de acionamento
      </h1>
      <p style={{ marginBottom: "20px", fontSize: "16px", color: "#2d3436" }}>
        Clique no botão abaixo para verificar.
      </p>

      {/* Botão Buscar */}
      <button
        onClick={fetchData}
        style={{
          padding: "10px 25px",
          fontSize: "16px",
          backgroundColor: "#FFC700",
          color: "#003B70",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          fontWeight: "bold",
        }}
      >
        Buscar última definição
      </button>

      {/* Bloco de exibição */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          width: "320px",
          textAlign: "left",
          color: "#2d3436",
        }}
      >
        {/* SEMPRE EXIBIR temperatura e pressão */}
        <p>
          <strong>Temperatura:</strong>{" "}
          {temperature !== null ? `${temperature} °C` : "Carregando..."}
        </p>
        <p>
          <strong>Pressão:</strong>{" "}
          {pressure !== null ? `${pressure} hPa` : "Carregando..."}
        </p>
        <p>
          <strong>Vazão:</strong>{" "}
          {flowRate !== null ? `${flowRate.toFixed(2)} L/min` : "Carregando..."}
        </p>
        <p>
          <strong>Total:</strong>{" "}
          {totalMilliliters !== null ? `${totalMilliliters} mL` : "Carregando..."}
        </p>

        {/* EXIBE APÓS CLICAR EM "Buscar" */}
        {data && (
          <>
            <p>
              <strong>Data:</strong>
              {String(data.day).padStart(2, "0")}/
              {String(data.month).padStart(2, "0")}/{data.year}
            </p>

            <p>
              <strong>Hora:</strong>
              {String(data.hour).padStart(2, "0")}:
              {String(data.minute).padStart(2, "0")}:
              {String(data.second).padStart(2, "0")}
            </p>

            <p>
              <strong>Válvula:</strong>
              <span
                style={{
                  marginLeft: "5px",
                  color: data.control ? "#27ae60" : "#e74c3c",
                }}
              >
                {data.control ? "Ligada" : "Desligada"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Read;
