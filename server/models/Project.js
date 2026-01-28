import mongoose from 'mongoose';

// Definimos la estructura de cómo se guardará cada proyecto
const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'El título es obligatorio'] 
  },
  description: { 
    type: String, 
    required: [true, 'La descripción es obligatoria'] 
  },
  image: { 
    type: String,
    default: 'https://via.placeholder.com/150' 
  },
  technologies: {
    type: [String], 
    default: []
  },
  githubUrl: { 
    type: String 
  },
  liveUrl: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Creamos el modelo
const Project = mongoose.model('Project', ProjectSchema);

// Exportación única y moderna para ES Modules
export default Project;