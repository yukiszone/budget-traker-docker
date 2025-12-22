# 💰 Docker Budget Tracker

Un'applicazione Full Stack per il tracciamento delle spese personali, progettata con un'architettura a microservizi containerizzati. Questo progetto dimostra l'orchestrazione di Frontend, Backend e Database tramite Docker Compose.

## 🏗️ Architettura \& Tecnologie

Il progetto è composto da 3 container isolati che comunicano tramite una rete Docker interna:

* **Frontend:** React (Vite) - Interfaccia utente reattiva e moderna.
* **Backend:** Python (FastAPI) - API REST asincrone ad alte prestazioni.
* **Database:** MongoDB - Database NoSQL per la persistenza dei dati.
* **DevOps:** Docker \& Docker Compose - Containerizzazione e orchestrazione dell'ambiente.

## 🚀 Guida Rapida

Non è necessario installare Node.js, Python o MongoDB sulla tua macchina. L'unico requisito è **Docker Desktop**.

### 1\. Clona il repository

git clone https://github.com/yukiszone/budget-tracker-docker.git
cd budget-tracker-docker

### 2\. Avvia l'applicazione

Esegui questo comando per costruire le immagini e avviare i container:
docker-compose up --build

### 3\. Accedi all'App

Una volta terminato il caricamento, apri il browser:

* **Frontend (App):** http://localhost:5173
* **Backend (API Docs):** http://localhost:8000/docs

Per spegnere tutto: CTRL + C nel terminale, oppure "docker-compose down".

## ✨ Funzionalità

* \[x] **Aggiunta Spese:** Inserimento in tempo reale di titolo e importo.
* \[x] **Visualizzazione:** Lista dinamica delle spese recuperata dal DB.
* \[x] **Calcolo Totale:** Somma automatica delle spese visibile in dashboard.
* \[x] **Cancellazione:** Possibilità di rimuovere spese (con persistenza su DB).
* \[x] **Data Persistence:** I dati rimangono salvati grazie ai Docker Volumes anche se il container viene riavviato.

## 📂 Struttura del Progetto

```text

├── docker-compose.yml   # File principale di orchestrazione

├── backend/             # Codice Python \& FastAPI

│   ├── main.py

│   ├── requirements.txt

│   └── Dockerfile

└── frontend/            # Codice React \& Vite

&nbsp;   ├── src/

&nbsp;   ├── package.json

&nbsp;   └── Dockerfile```

