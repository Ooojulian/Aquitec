// backend/index.js (CORREGIDO)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // <-- VOLVER A 3000 (Puerto INTERNO del contenedor)

// Importar las rutas de la API
const productoRoutes = require('./routes/Productos');
const ingredienteRoutes = require('./routes/ingredientes');
const bebidaRoutes = require('./routes/bebidas');
const ventasRoutes = require('./routes/ventas');
const empleadosRouter = require('./routes/empleados');
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const reportesRoutes = require('./routes/reportes');

// Middleware para analizar el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API! 🚀');
});

// Registrar las rutas de la API con sus respectivos prefijos
app.use('/api/productos', productoRoutes);
app.use('/api/ingredientes', ingredienteRoutes);
app.use('/api/bebidas', bebidaRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/empleados', empleadosRouter);
app.use('/api/login', loginRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reportes', reportesRoutes);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
});

// Iniciar el servidor y escuchar en el puerto 3000 en TODAS las interfaces ('0.0.0.0')
app.listen(port, '0.0.0.0', () => { // <-- AÑADIR '0.0.0.0' AQUÍ
  // Mensaje de log corregido para claridad
  console.log(`Servidor escuchando en el puerto ${port} en todas las interfaces (accesible vía host:5000)`);
});
