import { useEffect, useState } from 'react'; 
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import ProjectList from './components/ProjectList';
import { 
  GraduationCap, 
  Award, 
  Github, 
  Code2, 
  Database, 
  Globe, 
  Cpu,
  UserCircle,
  Lock,
  PlusCircle,
  LogOut,
  Trash2,      
  ExternalLink,
  BookOpen
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// SECCIÓN DE BLOGS PÚBLICA (Actualizada para leer de la API)
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error al cargar blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto min-h-screen relative z-10 pb-20">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl font-bold text-slate-100 italic"><span className="text-blue-400 font-mono not-italic text-xl mr-2">03.</span> Blogs</h2>
        <div className="h-[1px] bg-slate-800 flex-grow"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-[#112240] p-8 rounded-[2rem] border border-blue-500/10 hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <BookOpen className="text-blue-400" size={24} />
              <span className="text-[10px] font-mono text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">{blog.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{blog.description}</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag, i) => (
                <span key={i} className="text-[10px] font-mono text-blue-400/70 bg-blue-400/5 px-2 py-1 rounded-md">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {blogs.length === 0 && <p className="text-center text-slate-500 font-mono">No hay blogs publicados aún.</p>}
    </div>
  );
};

function AdminPanel() {
  const [projects, setProjects] = useState([]); 
  const [blogs, setBlogs] = useState([]); // Nuevo estado para blogs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });
  
  // Nuevo estado para formulario de blogs
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: ''
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error al cargar blogs:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };
      await axios.post(`${API_URL}/projects`, projectData);
      alert('¡Proyecto guardado!');
      setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
      fetchProjects(); 
    } catch (err) {
      alert('Error al guardar proyecto');
    }
  };

  // Nuevo Submit para Blogs
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        ...blogFormData,
        tags: blogFormData.tags.split(',').map(t => t.trim())
      };
      await axios.post(`${API_URL}/blogs`, blogData);
      alert('¡Blog publicado!');
      setBlogFormData({ title: '', description: '', content: '', tags: '' });
      fetchBlogs();
    } catch (err) {
      alert('Error al publicar blog');
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('¿Eliminar proyecto?')) {
      await axios.delete(`${API_URL}/projects/${id}`);
      fetchProjects(); 
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('¿Eliminar blog?')) {
      await axios.delete(`${API_URL}/blogs/${id}`);
      fetchBlogs(); 
    }
  };

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen relative z-10 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-white italic">Panel de Control Fullstack</h2>
        <button 
          onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/'; }}
          className="flex items-center gap-2 text-xs font-mono text-red-400 border border-red-400/20 px-4 py-2 rounded-lg hover:bg-red-400/10 transition-all"
        >
          <LogOut size={14}/> SALIR
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* SECCIÓN PROYECTOS */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="bg-[#112240] p-6 rounded-[2rem] border border-blue-500/10 space-y-4">
            <h3 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em]">Nuevo Proyecto</h3>
            <input placeholder="Título" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <textarea placeholder="Descripción" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            <input placeholder="Tecnologías (React, Node...)" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} required />
            <button type="submit" className="w-full bg-blue-500/10 border border-blue-500/50 text-blue-400 font-bold py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-xs flex items-center justify-center gap-2">
              <PlusCircle size={16}/> GUARDAR PROYECTO
            </button>
          </form>

          <div className="bg-[#112240] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/5">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="text-slate-100 font-bold text-sm">{p.title}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteProject(p._id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIÓN BLOGS */}
        <div className="space-y-8">
          <form onSubmit={handleBlogSubmit} className="bg-[#112240] p-6 rounded-[2rem] border border-emerald-500/10 space-y-4">
            <h3 className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em]">Nuevo Blog Post</h3>
            <input placeholder="Título del Blog" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={blogFormData.title} onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})} required />
            <input placeholder="Resumen corto" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={blogFormData.description} onChange={(e) => setBlogFormData({...blogFormData, description: e.target.value})} required />
            <textarea placeholder="Contenido completo..." rows="4" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={blogFormData.content} onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})} required />
            <input placeholder="Etiquetas (Tips, Desarrollo...)" className="w-full bg-[#020c1b] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none" value={blogFormData.tags} onChange={(e) => setBlogFormData({...blogFormData, tags: e.target.value})} />
            <button type="submit" className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-bold py-3 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-xs flex items-center justify-center gap-2">
              <PlusCircle size={16}/> PUBLICAR BLOG
            </button>
          </form>

          <div className="bg-[#112240] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/5">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="text-slate-100 font-bold text-sm">{b.title}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteBlog(b._id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('adminToken', 'true');
      window.location.href = '/admin';
    } else {
      alert('Acceso denegado');
    }
  };

  return (
    <div className="pt-40 flex justify-center items-center relative z-10 px-6">
      <form onSubmit={handleSubmit} className="bg-[#112240] p-10 rounded-[2rem] border border-blue-500/20 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500/10 p-4 rounded-full mb-4">
            <Lock className="text-blue-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono">Acceso Admin</h2>
        </div>
        <input 
          type="password" 
          placeholder="Contraseña"
          className="w-full bg-[#020c1b] border border-blue-500/10 rounded-xl px-6 py-4 text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all">
          INGRESAR
        </button>
      </form>
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log("Intentando conectar a:", API_URL);
  }, []);

  const isAdmin = localStorage.getItem('adminToken') === 'true';

  return (
    <div className="min-h-screen bg-[#020c1b] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      <div id="vanta-canvas" className="fixed inset-0 pointer-events-none z-0"></div>
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <nav className="fixed top-0 w-full z-50 px-10 py-6 backdrop-blur-md bg-[#020c1b]/50 flex justify-between items-center border-b border-white/5">
        <Link to="/" className="text-blue-400 font-mono font-bold text-xl tracking-tighter hover:scale-110 transition-transform cursor-default">NC</Link>
        <div className="flex gap-8 text-[10px] font-mono tracking-[0.2em] items-center">
          <Link to="/" className="hover:text-blue-400 transition-colors cursor-pointer"><span className="text-blue-400">01.</span> INICIO</Link>
          <Link to="/blogs" className="hover:text-blue-400 transition-colors cursor-pointer"><span className="text-blue-400">02.</span> BLOGS</Link>
          <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500/10 transition-all">
            <UserCircle size={14}/> {isAdmin ? 'PANEL' : 'ADMIN'}
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <section className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto relative z-10">
              <p className="text-blue-400 font-mono mb-4 animate-fade-in text-sm tracking-widest uppercase">01. Hola, mi nombre es</p>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 animate-gradient-x">
                  Nicolás Correa.
                </span>
              </h1>

              <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8 flex flex-wrap items-center gap-4">
                Desarrollador de Software <span className="text-blue-500/30 hidden md:block">|</span> <span className="flex items-center gap-3">PUCE <GraduationCap className="text-blue-400" size={32}/></span>
              </h2>

              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                Actualmente estoy cursando el tercer semestre de la Tecnología en Desarrollo de Software. Mediante los conocimientos adquiridos en las distintas materias de este semestre, he desarrollado este portafolio digital utilizando tailwind y otras tecnologías que resumen los conocimientos adquiridos. 
              </p>

              <div className="mt-12 flex flex-wrap gap-8 items-center">
                <a href="#proyectos" className="group relative border-2 border-blue-500 text-blue-400 px-10 py-4 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:text-white">
                  <span className="relative z-10">Mira mis proyectos</span>
                  <div className="absolute inset-0 bg-blue-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
                
                <a 
                  href="https://github.com/nickc333dotcom" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-all hover:-translate-y-1 group"
                >
                  <Github size={32} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-tighter text-slate-500 group-hover:text-blue-400 transition-colors">Mi</span>
                    <span className="text-xs font-bold font-mono">/Github</span>
                  </div>
                </a>
              </div>
            </section>

            <section id="sobre-mi" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-4xl font-bold text-slate-100 italic"><span className="text-blue-400 font-mono not-italic text-xl mr-2">01.</span> Sobre mí</h2>
                <div className="h-[1px] bg-slate-800 flex-grow"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6 text-slate-400">
                  <p className="text-lg">
                    Para mí, desarrollar no es solo escribir código, es resolver problemas del mundo real.
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                    <p className="text-blue-400 font-mono text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                      <Code2 size={16}/> Tecnologías principales:
                    </p>
                    <ul className="grid grid-cols-2 gap-4 font-mono text-xs text-slate-300">
                      <li className="flex items-center gap-2"><Database size={14}/> Python / Django</li>
                      <li className="flex items-center gap-2"><Cpu size={14}/> PostgreSQL</li>
                      <li className="flex items-center gap-2"><Code2 size={14}/> React.js</li>
                      <li className="flex items-center gap-2"><Database size={14}/> MongoDB</li>
                    </ul>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-[#112240] p-10 rounded-[2rem] border border-blue-500/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                    <Globe className="text-blue-400 mb-6 animate-pulse" size={40} />
                    <h3 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Perfil Académico</h3>
                    <p className="text-white font-black text-3xl mb-2 tracking-tight">Inglés Avanzado</p>
                    <div className="flex items-center gap-2 text-slate-500 italic text-sm">
                      <Award size={16} className="text-yellow-500/70" />
                      Certificado Bachillerato Internacional
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="proyectos" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-4xl font-bold text-slate-100 italic"><span className="text-blue-400 font-mono not-italic text-xl mr-2">02.</span> Portafolio Técnico</h2>
                <div className="h-[1px] bg-slate-800 flex-grow"></div>
              </div>
              <ProjectList apiUrl={API_URL} />
            </section>
          </>
        } />
        
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;