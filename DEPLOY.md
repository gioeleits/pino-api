# 🚀 Guida Rapida al Deployment

## 📋 Checklist Pre-Deploy

- ✅ Repository creato e pushato su GitHub
- ✅ File `package.json` configurato
- ✅ File `db.json` con struttura corretta
- ✅ File `server.js` per configurazione personalizzata

## 🌐 Deployment su Railway (Raccomandato)

### Passo 1: Preparazione
1. Vai su [railway.app](https://railway.app)
2. Accedi con GitHub
3. Clicca "New Project"

### Passo 2: Deploy
1. Seleziona "Deploy from GitHub repo"
2. Scegli il repository `pino-api`
3. Railway rileverà automaticamente Node.js
4. Il deploy inizierà automaticamente

### Passo 3: Configurazione
- Railway assegnerà automaticamente un URL
- La variabile `PORT` sarà impostata automaticamente
- Il database `db.json` sarà persistente

### Passo 4: Test
```bash
# Sostituisci YOUR_RAILWAY_URL con l'URL fornito
curl https://YOUR_RAILWAY_URL.railway.app/todos
```

## 🔧 Deployment su Render

### Passo 1: Setup
1. Vai su [render.com](https://render.com)
2. Clicca "New +" → "Web Service"
3. Connetti il repository GitHub

### Passo 2: Configurazione
- **Name**: `pino-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (per test)

### Passo 3: Deploy
- Clicca "Create Web Service"
- Attendi il completamento del build
- Render fornirà un URL pubblico

## ⚡ Deployment su Vercel

### Opzione A: CLI
```bash
cd pino-api
npm i -g vercel
vercel
```

### Opzione B: Dashboard
1. Vai su [vercel.com](https://vercel.com)
2. Importa il repository GitHub
3. Vercel rileverà automaticamente la configurazione
4. Deploy automatico

## 🔗 Aggiornamento Frontend

Dopo il deploy dell'API, aggiorna il frontend:

```javascript
// In src/routes/+page.svelte del progetto principale
const API_BASE = 'https://tuo-api-url.com'; // Sostituisci con l'URL reale
```

## 🧪 Test dell'API Deployata

```bash
# Test base
curl https://tuo-api-url.com/todos

# Dovrebbe restituire: []

# Test creazione todo
curl -X POST https://tuo-api-url.com/todos \
  -H "Content-Type: application/json" \
  -d '{"id":1,"text":"Test deploy","completed":false}'

# Test lettura
curl https://tuo-api-url.com/todos

# Dovrebbe restituire: [{"id":1,"text":"Test deploy","completed":false}]
```

## 🛠️ Troubleshooting

### Errore "Application failed to respond"
- ✅ Verifica che `package.json` abbia `"start": "node server.js"`
- ✅ Controlla che `server.js` sia presente
- ✅ Verifica i log del servizio di hosting

### Errori CORS
- ✅ Il file `server.js` gestisce CORS automaticamente
- ✅ Verifica che l'URL dell'API nel frontend sia corretto

### Database non persistente
- ✅ Su Railway e Render i dati sono persistenti
- ✅ Su Vercel potrebbero non essere persistenti (usa un database esterno)

## 📱 URL di Esempio

Dopo il deploy, i tuoi endpoint saranno:

```
https://tuo-progetto.railway.app/todos
https://tuo-progetto.railway.app/settings
```

Oppure:

```
https://tuo-progetto.onrender.com/todos
https://tuo-progetto.onrender.com/settings
```

## 🔄 Aggiornamenti

Per aggiornare l'API:
1. Modifica il codice localmente
2. Committa e pusha su GitHub
3. Il deploy si aggiornerà automaticamente

---

**💡 Suggerimento**: Salva l'URL dell'API deployata, ti servirà per configurare il frontend!