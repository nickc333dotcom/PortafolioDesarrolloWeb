import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Seguridad de cabeceras
import rateLimit from 'express-rate-limit'; // Protección contra spam

// 1. IMPORTAR EL MODELO
import Project from './models/Project.js';

dotenv.config();

const app = express();

// 2. MIDDLEWARES DE SEGURIDAD
app.use(helmet()); // Blindaje de seguridad básica
app.use(cors()); // Permite peticiones externas (Frontend)
app.use(express.json({ limit: '10kb' })); // Limita el tamaño del JSON para evitar ataques de sobrecarga

// Limitador de peticiones: evita que alguien colapse tu API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por ventana
  message: "Demasiadas peticiones desde esta IP, intenta más tarde."
});
app.use('/api/', limiter);

// 3. CONEXIÓN A MONGOOSE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Base de datos protegida y conectada ✅'))
  .catch(err => console.error('Error al conectar a MongoDB ❌', err));

// 4. RUTAS (Lógica de Negocio)

// Obtener proyectos (Público)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear proyecto (Idealmente debería tener un middleware de Auth después)
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Datos de proyecto inválidos' });
  }
});

// 5. ARRANCAR SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app corriendo en ${PORT}`);
});