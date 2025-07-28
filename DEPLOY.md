# 🚀 Guida Rapida al Deployment

## 📋 Checklist Pre-Deploy

- ✅ Repository creato e pushato su GitHub
- ✅ File `package.json` configurato
- ✅ File `db.json` con struttura corretta
- ✅ File `server.js` per configurazione personalizzata

## 🌐 Deployment su Railway (Raccomandato)

### Passo 1: Preparazione
1. **Assicurati che il codice sia su GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Railway deploy"
   git push origin main
   ```

2. Vai su [railway.app](https://railway.app)
3. Clicca "Login" e accedi con GitHub
4. Clicca "New Project"

### Passo 2: Deploy
1. Seleziona "Deploy from GitHub repo"
2. **Autorizza Railway** ad accedere ai tuoi repository se richiesto
3. Scegli il repository `pino-api`
4. Railway rileverà automaticamente Node.js
5. **IMPORTANTE**: Verifica che Railway usi il comando `npm start`

### Passo 3: Configurazione Automatica
- ✅ Railway assegnerà automaticamente un URL (es: `https://pino-api-production.up.railway.app`)
- ✅ La variabile `PORT` sarà impostata automaticamente
- ✅ Il database `db.json` sarà persistente
- ✅ Deploy automatico ad ogni push su GitHub

### Passo 4: Verifica Deploy
1. **Attendi il completamento** (2-3 minuti)
2. **Clicca sul tuo progetto** nella dashboard Railway
3. **Vai alla tab "Deployments"** per vedere i log
4. **Copia l'URL pubblico** dalla tab "Settings" → "Domains"

### Passo 5: Test
```bash
# Sostituisci YOUR_RAILWAY_URL con l'URL fornito
curl https://YOUR_RAILWAY_URL/todos
# Dovrebbe restituire: []

# Test completo
curl -X POST https://YOUR_RAILWAY_URL/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Railway","completed":false}'
```

### 🚨 Risoluzione Problemi Railway

**Deploy fallisce:**
- ✅ Verifica che `package.json` abbia `"start": "node server.js"`
- ✅ Controlla i log nella tab "Deployments"
- ✅ Assicurati che `server.js` sia nel root del progetto

**App non risponde:**
- ✅ Verifica che il server usi `process.env.PORT`
- ✅ Controlla che l'host sia `0.0.0.0` (già configurato)
- ✅ Attendi qualche minuto per il cold start

**Repository non trovato:**
- ✅ Assicurati che il repository sia pubblico O che Railway abbia i permessi
- ✅ Riconnetti GitHub nelle impostazioni Railway se necessario

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