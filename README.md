# 🚀 Pino API

API REST per l'applicazione To-Do List Pino, basata su JSON Server.

## 📋 Caratteristiche

- ✅ API REST completa per gestione todo
- 🔄 Persistenza automatica dei dati
- 🌐 CORS configurato per sviluppo e produzione
- ⚡ Setup rapido e deployment semplice

## 🛠️ Installazione Locale

```bash
# Clona il repository
git clone <url-del-repo-api>
cd pino-api

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'API sarà disponibile su http://localhost:3001

## 📡 Endpoints

### Todos
- `GET /todos` - Ottieni tutti i todo
- `POST /todos` - Crea un nuovo todo
- `PUT /todos/:id` - Aggiorna un todo
- `DELETE /todos/:id` - Elimina un todo

### Settings
- `GET /settings` - Ottieni le impostazioni
- `PUT /settings` - Aggiorna le impostazioni

## 🚀 Deployment

### Railway

1. **Connetti il repository a Railway**:
   - Vai su [Railway](https://railway.app)
   - Connetti il tuo repository GitHub
   - Railway rileverà automaticamente il progetto Node.js

2. **Configurazione automatica**:
   - Railway userà automaticamente `npm start`
   - La variabile `$PORT` sarà impostata automaticamente

### Render

1. **Crea un nuovo Web Service**:
   - Vai su [Render](https://render.com)
   - Connetti il repository GitHub
   - Seleziona "Web Service"

2. **Configurazione**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### Vercel

1. **Installa Vercel CLI** (opzionale):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

   Oppure connetti il repository su [Vercel Dashboard](https://vercel.com)

### Heroku

1. **Crea un'app Heroku**:
   ```bash
   heroku create nome-tua-api
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   ```

## 🔧 Configurazione

### Variabili d'Ambiente

- `PORT`: Porta del server (impostata automaticamente dai servizi cloud)
- `HOST`: Host del server (default: 0.0.0.0 per produzione)

### CORS

JSON Server gestisce automaticamente CORS. Per configurazioni personalizzate, puoi creare un file `server.js` personalizzato.

## 📁 Struttura del Database

```json
{
  "todos": [
    {
      "id": 1,
      "text": "Esempio di attività",
      "completed": false
    }
  ],
  "settings": {
    "nextId": 2
  }
}
```

## 🧪 Test dell'API

### Con curl

```bash
# Ottieni tutti i todo
curl https://tua-api-url.com/todos

# Crea un nuovo todo
curl -X POST https://tua-api-url.com/todos \
  -H "Content-Type: application/json" \
  -d '{"id":1,"text":"Test todo","completed":false}'

# Aggiorna un todo
curl -X PUT https://tua-api-url.com/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"text":"Todo aggiornato","completed":true}'

# Elimina un todo
curl -X DELETE https://tua-api-url.com/todos/1
```

### Con Postman

Importa questa collezione per testare tutti gli endpoints:

```json
{
  "info": {
    "name": "Pino API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/todos"
      }
    },
    {
      "name": "Create Todo",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/todos",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"id\":1,\"text\":\"Test todo\",\"completed\":false}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "https://tua-api-url.com"
    }
  ]
}
```

## 🛠️ Risoluzione Problemi

### L'API non si avvia
- ✅ Verifica che Node.js sia installato (versione 18+)
- ✅ Controlla che `package.json` sia presente
- ✅ Esegui `npm install` per installare le dipendenze

### Errori di CORS
- ✅ JSON Server gestisce CORS automaticamente
- ✅ Per configurazioni personalizzate, modifica le impostazioni del server

### Dati non persistenti
- ✅ Verifica che `db.json` sia scrivibile
- ✅ Controlla i log del server per errori
- ✅ Assicurati che il file non sia in sola lettura

## 📄 Licenza

Questo progetto è sotto licenza MIT.

## 🔗 Link Utili

- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)