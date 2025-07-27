const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configurazione CORS personalizzata
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware di default
server.use(middlewares);

// Middleware per il parsing del body
server.use(jsonServer.bodyParser);

// Middleware personalizzato per logging
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
server.use('/api', router);
server.use(router);

// Porta
const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, () => {
  console.log(`🚀 JSON Server is running on http://${host}:${port}`);
  console.log(`📡 API endpoints available at:`);
  console.log(`   - GET    /todos`);
  console.log(`   - POST   /todos`);
  console.log(`   - PUT    /todos/:id`);
  console.log(`   - DELETE /todos/:id`);
  console.log(`   - GET    /settings`);
  console.log(`   - PUT    /settings`);
});

module.exports = server;