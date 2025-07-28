# 🚂 Guida Completa Railway Deploy

## ✅ Checklist Pre-Deploy

- [ ] Repository pushato su GitHub
- [ ] File `package.json` con script `start`
- [ ] File `server.js` nel root
- [ ] File `db.json` presente

## 🚀 Deploy Step-by-Step

### 1. Prepara il Repository
```bash
# Assicurati che tutto sia committato
git status
git add .
git commit -m "Ready for Railway deploy"
git push origin main
```

### 2. Accedi a Railway
1. Vai su **https://railway.app**
2. Clicca **"Start a New Project"**
3. Seleziona **"Deploy from GitHub repo"**
4. **Autorizza Railway** se è la prima volta

### 3. Seleziona Repository
1. Cerca `pino-api` nella lista
2. Clicca sul repository
3. Railway inizierà automaticamente il deploy

### 4. Verifica Configurazione
Railway dovrebbe rilevare automaticamente:
- ✅ **Runtime**: Node.js
- ✅ **Build Command**: `npm install`
- ✅ **Start Command**: `npm start`
- ✅ **Port**: Variabile `$PORT` (automatica)

### 5. Monitora il Deploy
1. **Dashboard**: Vedrai il progetto nella tua dashboard
2. **Logs**: Clicca sul progetto → tab "Deployments"
3. **Status**: Attendi che diventi "Active" (2-3 minuti)

### 6. Ottieni l'URL
1. Clicca sul tuo progetto
2. Vai su **"Settings"** → **"Domains"**
3. Copia l'URL (es: `https://pino-api-production.up.railway.app`)

## 🧪 Test dell'API

```bash
# Sostituisci URL_RAILWAY con il tuo URL
export API_URL="https://tuo-progetto.up.railway.app"

# Test 1: Verifica che l'API risponda
curl $API_URL/todos
# Risultato atteso: []

# Test 2: Crea un todo
curl -X POST $API_URL/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Railway Deploy","completed":false}'

# Test 3: Verifica che sia stato creato
curl $API_URL/todos
# Risultato atteso: [{"id":1,"text":"Test Railway Deploy","completed":false}]

# Test 4: Verifica settings
curl $API_URL/settings
# Risultato atteso: {"nextId":2}
```

## 🚨 Troubleshooting

### Deploy Fallisce


**Errore: "Cannot find module 'json-server'"**
```bash
# Rimuovi package-lock.json e reinstalla
rm package-lock.json
npm install
git add .
git commit -m "Fix json-server dependency"
git push origin main
```
- ✅ Abbiamo aggiornato a json-server versione stabile (0.17.4)
- ✅ Il server ora crea automaticamente db.json se mancante

**Errore: "Build failed"**
```bash
# Verifica package.json localmente
npm install
npm start
# Se funziona localmente, il problema è nella configurazione Railway
```

**Errore: "Start command not found"**
- Verifica che `package.json` abbia:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### App Non Risponde

**Errore 503 o timeout**
1. Controlla i logs in Railway
2. Verifica che il server usi `process.env.PORT`
3. Attendi il "cold start" (primo avvio può richiedere 30-60 secondi)
4. Verifica che db.json sia presente o venga creato automaticamente

**CORS Errors**
- Il file `server.js` già gestisce CORS
- Verifica che l'URL nel frontend sia corretto

### Repository Non Trovato

1. **Repository privato**: Assicurati che Railway abbia i permessi
2. **Riconnetti GitHub**:
   - Vai su Railway → Settings → Integrations
   - Disconnetti e riconnetti GitHub
3. **Repository pubblico**: Più semplice per il primo deploy

## 🔄 Aggiornamenti Automatici

Dopo il primo deploy:
1. Modifica il codice localmente
2. Committa e pusha:
```bash
git add .
git commit -m "Update API"
git push origin main
```
3. Railway farà automaticamente il redeploy!

## 💡 Tips

- **Logs in tempo reale**: Railway → Progetto → "View Logs"
- **Variabili ambiente**: Railway → Settings → Variables
- **Custom domain**: Railway → Settings → Domains → "Custom Domain"
- **Database persistente**: Railway mantiene automaticamente `db.json`

## 📱 URL Finale

Salva il tuo URL Railway per usarlo nel frontend:
```javascript
// Nel tuo progetto Svelte
const API_BASE = 'https://tuo-progetto.up.railway.app';
```

---

**🎉 Congratulazioni! La tua API è ora live su Railway!**