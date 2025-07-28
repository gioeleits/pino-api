#!/usr/bin/env node

/**
 * Script di test per verificare che l'API Pino funzioni correttamente
 * Uso: node test-api.js <URL_API>
 * Esempio: node test-api.js https://pino-api-production.up.railway.app
 */

const https = require('https');
const http = require('http');

const API_URL = process.argv[2];

if (!API_URL) {
  console.log('❌ Errore: Fornisci l\'URL dell\'API');
  console.log('Uso: node test-api.js <URL_API>');
  console.log('Esempio: node test-api.js https://pino-api-production.up.railway.app');
  process.exit(1);
}

console.log(`🧪 Testing API: ${API_URL}`);
console.log('=' .repeat(50));

// Funzione helper per fare richieste HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : null;
          resolve({ status: res.statusCode, data: parsed, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, raw: data });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Test functions
async function test1_GetTodos() {
  console.log('\n📋 Test 1: GET /todos');
  try {
    const response = await makeRequest(`${API_URL}/todos`);
    if (response.status === 200) {
      console.log('✅ Status: 200 OK');
      console.log(`✅ Response: ${JSON.stringify(response.data)}`);
      return true;
    } else {
      console.log(`❌ Status: ${response.status}`);
      console.log(`❌ Response: ${response.raw}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function test2_CreateTodo() {
  console.log('\n➕ Test 2: POST /todos');
  try {
    const newTodo = {
      text: 'Test todo from script',
      completed: false
    };
    
    const response = await makeRequest(`${API_URL}/todos`, {
      method: 'POST',
      body: newTodo
    });
    
    if (response.status === 201) {
      console.log('✅ Status: 201 Created');
      console.log(`✅ Created todo: ${JSON.stringify(response.data)}`);
      return response.data.id;
    } else {
      console.log(`❌ Status: ${response.status}`);
      console.log(`❌ Response: ${response.raw}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

async function test3_GetTodoById(id) {
  console.log(`\n🔍 Test 3: GET /todos/${id}`);
  try {
    const response = await makeRequest(`${API_URL}/todos/${id}`);
    if (response.status === 200) {
      console.log('✅ Status: 200 OK');
      console.log(`✅ Todo: ${JSON.stringify(response.data)}`);
      return true;
    } else {
      console.log(`❌ Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function test4_UpdateTodo(id) {
  console.log(`\n✏️ Test 4: PUT /todos/${id}`);
  try {
    const updatedTodo = {
      id: id,
      text: 'Updated todo from script',
      completed: true
    };
    
    const response = await makeRequest(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      body: updatedTodo
    });
    
    if (response.status === 200) {
      console.log('✅ Status: 200 OK');
      console.log(`✅ Updated todo: ${JSON.stringify(response.data)}`);
      return true;
    } else {
      console.log(`❌ Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function test5_GetSettings() {
  console.log('\n⚙️ Test 5: GET /settings');
  try {
    const response = await makeRequest(`${API_URL}/settings`);
    if (response.status === 200) {
      console.log('✅ Status: 200 OK');
      console.log(`✅ Settings: ${JSON.stringify(response.data)}`);
      return true;
    } else {
      console.log(`❌ Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function test6_DeleteTodo(id) {
  console.log(`\n🗑️ Test 6: DELETE /todos/${id}`);
  try {
    const response = await makeRequest(`${API_URL}/todos/${id}`, {
      method: 'DELETE'
    });
    
    if (response.status === 200) {
      console.log('✅ Status: 200 OK');
      console.log('✅ Todo deleted successfully');
      return true;
    } else {
      console.log(`❌ Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runTests() {
  const results = [];
  
  // Test 1: Get initial todos
  results.push(await test1_GetTodos());
  
  // Test 2: Create a new todo
  const todoId = await test2_CreateTodo();
  results.push(todoId !== null);
  
  if (todoId) {
    // Test 3: Get the created todo
    results.push(await test3_GetTodoById(todoId));
    
    // Test 4: Update the todo
    results.push(await test4_UpdateTodo(todoId));
    
    // Test 6: Delete the todo
    results.push(await test6_DeleteTodo(todoId));
  } else {
    results.push(false, false, false);
  }
  
  // Test 5: Get settings
  results.push(await test5_GetSettings());
  
  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log('📊 RISULTATI TEST:');
  console.log('=' .repeat(50));
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`✅ Test passati: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('🎉 Tutti i test sono passati! L\'API funziona correttamente.');
    process.exit(0);
  } else {
    console.log('❌ Alcuni test sono falliti. Controlla la configurazione.');
    process.exit(1);
  }
}

// Avvia i test
runTests().catch(error => {
  console.log(`\n💥 Errore fatale: ${error.message}`);
  console.log('Verifica che l\'URL dell\'API sia corretto e che il server sia in esecuzione.');
  process.exit(1);
});