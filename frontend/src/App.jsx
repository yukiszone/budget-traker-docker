import React, { useState, useEffect } from 'react';

function App() {
  const [spese, setSpese] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [importo, setImporto] = useState("");

  // Scarica le spese dal backend
  const scaricaSpese = async () => {
    try {
      const response = await fetch('http://localhost:8000/lista/');
      const data = await response.json();
      // Controllo di sicurezza: se data non è una lista, usiamo una lista vuota
      setSpese(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Errore:", error);
      setSpese([]);
    }
  };

  useEffect(() => {
    scaricaSpese();
  }, []);

  // Invia nuova spesa
  const inviaSpesa = async (e) => {
    e.preventDefault();
    if (!importo || !titolo) return; // Non inviare se vuoto

    const nuovaSpesa = { titolo, importo: parseFloat(importo) };

    await fetch('http://localhost:8000/aggiungi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuovaSpesa),
    });

    setTitolo("");
    setImporto("");
    scaricaSpese();
  };

  // Cancella spesa
  const cancellaSpesa = async (id) => {
    await fetch(`http://localhost:8000/cancella/${id}`, {
      method: 'DELETE',
    });
    scaricaSpese();
  };

  // --- CALCOLO DEL TOTALE ---
  // Reduce somma tutti gli importi partendo da 0
  const totale = spese.reduce((acc, spesa) => acc + (spesa.importo || 0), 0);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>💰 Budget Tracker</h1>
      
      {/* BOX TOTALE */}
      <div style={{ 
        background: "#34495e", 
        color: "white", 
        padding: "20px", 
        borderRadius: "8px", 
        textAlign: "center", 
        marginBottom: "30px",
        fontSize: "24px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        Totale Speso: {totale.toFixed(2)} €
      </div>

      {/* FORM */}
      <div style={{ background: "#ecf0f1", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <form onSubmit={inviaSpesa} style={{ display: "flex", gap: "10px" }}>
          <input 
            type="text" 
            placeholder="Descrizione (es. Pizza)" 
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
            style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input 
            type="number" 
            placeholder="€" 
            value={importo}
            onChange={(e) => setImporto(e.target.value)}
            required
            style={{ padding: "10px", width: "80px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>
            +
          </button>
        </form>
      </div>

      {/* LISTA */}
      <h3 style={{ borderBottom: "2px solid #ecf0f1", paddingBottom: "10px" }}>Ultimi Movimenti</h3>
      
      {spese.length === 0 ? (
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>Nessuna spesa. Aggiungine una!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {spese.map((spesa) => (
            <li key={spesa.id} style={{ 
              background: "white",
              borderBottom: "1px solid #eee", 
              padding: "15px", 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
              borderRadius: "5px"
            }}>
              <span style={{ fontSize: "18px" }}>{spesa.titolo}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ fontWeight: "bold", color: "#e74c3c", fontSize: "18px" }}>- {spesa.importo} €</span>
                <button 
                  onClick={() => cancellaSpesa(spesa.id)}
                  style={{ 
                    background: "transparent", 
                    border: "1px solid #e74c3c", 
                    color: "#e74c3c",
                    padding: "5px 10px", 
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                  title="Elimina"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;