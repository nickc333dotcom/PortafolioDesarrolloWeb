import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet'; 
import rateLimit from 'express-rate-limit'; 

import Project from './models/Project.js';
import Blog from './models/Blog.js';

dotenv.config();

const app = express();

app.use(helmet()); 
app.use(cors()); 
app.use(express.json({ limit: '10kb' })); 


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Demasiadas peticiones desde esta IP, intenta más tarde."
});
app.use('/api/', limiter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Base de datos protegida y conectada ✅'))
  .catch(err => console.error('Error al conectar a MongoDB ❌', err));

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Datos de proyecto inválidos' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proyecto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el proyecto' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el blog' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el blog' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el blog' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app corriendo en ${PORT}`);
});