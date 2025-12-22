from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId # <--- NEW: Serve per gestire gli ID di Mongo
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo_db:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database("budget_db")
collection = db.get_collection("spese")

class Spesa(BaseModel):
    titolo: str
    importo: float

@app.get("/")
def home():
    return {"messaggio": "Il Backend funziona!"}

@app.post("/aggiungi/")
async def aggiungi_spesa(spesa: Spesa):
    documento = spesa.dict()
    result = await collection.insert_one(documento)
    # Restituiamo l'id appena creato convertito in stringa
    return {"id": str(result.inserted_id), "msg": "Salvato"}

@app.get("/lista/")
async def lista_spese():
    spese = []
    # NEW: Ora prendiamo anche l'ID (_id), ma dobbiamo trasformarlo in stringa
    async for document in collection.find({}):
        # Trasforma l'ObjectId strano di Mongo in una stringa normale
        document["id"] = str(document["_id"])
        del document["_id"] # Rimuoviamo l'originale per non rompere il JSON
        spese.append(document)
    return spese

# NEW: Ecco la funzione per cancellare
@app.delete("/cancella/{id_spesa}")
async def cancella_spesa(id_spesa: str):
    # Cerchiamo l'oggetto con quell'ID e lo cancelliamo
    result = await collection.delete_one({"_id": ObjectId(id_spesa)})
    if result.deleted_count == 1:
        return {"msg": "Cancellato con successo"}
    raise HTTPException(status_code=404, detail="Spesa non trovata")