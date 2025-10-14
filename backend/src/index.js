const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
app.use(cors()); 
app.use(express.json()); 

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, 
});

async function createTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY, [cite: 127, 129, 134]
        title VARCHAR(255) NOT NULL, [cite: 128, 130, 135]
        completed BOOLEAN DEFAULT false, [cite: 131, 136]
        created_at TIMESTAMP DEFAULT NOW() [cite: 132, 137]
      );
    `;
    await pool.query(query);
    console.log("Tabla 'tasks' verificada o creada exitosamente.");
  } catch (err) {
    console.error("Error al crear la tabla 'tasks':", err);
  }
}

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at ASC');
    res.status(200).json(result.rows); [cite: 89, 90]
  } catch (err) {
    res.status(500).send("Error al obtener tareas.");
  }
});

// POST /tasks: Crea una nueva tarea [cite: 100]
app.post('/tasks', async (req, res) => {
  const { title } = req.body; // Solo se necesita el title [cite: 106]
  if (!title) {
    return res.status(400).send("El campo 'title' es requerido.");
  }
  try {
    const query = 'INSERT INTO tasks (title) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [title]);
    res.status(201).json(result.rows[0]); [cite: 107, 108]
  } catch (err) {
    res.status(500).send("Error al crear la tarea.");
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // Solo se actualiza 'completed' [cite: 115]
  
  if (typeof completed !== 'boolean') {
      return res.status(400).send("El campo 'completed' debe ser booleano.");
  }
  
  try {
    const query = 'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [completed, id]);

    if (result.rows.length === 0) {
        return res.status(404).send("Tarea no encontrada.");
    }
    res.status(200).json(result.rows[0]); [cite: 116, 117]
  } catch (err) {
    res.status(500).send("Error al actualizar la tarea.");
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM tasks WHERE id = $1';
    await pool.query(query, [id]);
    res.status(204).send(); // 204 No Content [cite: 121]
  } catch (err) {
    res.status(500).send("Error al eliminar la tarea.");
  }
});



const PORT = 3000;
async function startServer() {
  await createTable(); // Asegura que la tabla exista al iniciar
  app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
  });
}

startServer();

