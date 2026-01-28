import ProjectList from './components/ProjectList';
import { 
  GraduationCap, 
  Award, 
  Github, 
  Code2, 
  Database, 
  Globe, 
  Cpu 
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#020c1b] text-slate-300 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* CAPA DE PARTÍCULAS Y NEBLINA */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        {/* Partículas simples con CSS */}
        <div className="particle top-20 left-[20%]"></div>
        <div className="particle top-60 left-[80%]"></div>
        <div className="particle top-[80%] left-[40%]"></div>
      </div>

      {/* NAVEGACIÓN RÁPIDA */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 backdrop-blur-md bg-[#020c1b]/50 flex justify-between items-center border-b border-white/5">
        <div className="text-blue-400 font-mono font-bold text-xl tracking-tighter hover:scale-110 transition-transform cursor-default">NC</div>
        <div className="flex gap-8 text-[10px] font-mono tracking-[0.2em]">
          <a href="#sobre-mi" className="hover:text-blue-400 transition-colors cursor-pointer"><span className="text-blue-400">01.</span> SOBRE MÍ</a>
          <a href="#proyectos" className="hover:text-blue-400 transition-colors cursor-pointer"><span className="text-blue-400">02.</span> PORTAFOLIO</a>
        </div>
      </nav>

      {/* SECCIÓN 1: HERO */}
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
          <a href="#proyectos" className="group relative border-2 border-blue-500 text-blue-400 px-10 py-4 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <span className="relative z-10">Mira mis proyectos</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          
          {/* Único Link: GitHub con interacción pro */}
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

      {/* SECCIÓN 2: SOBRE MÍ Y SKILLS */}
      <section id="sobre-mi" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-100 italic"><span className="text-blue-400 font-mono not-italic text-xl mr-2">01.</span> Sobre mí</h2>
          <div className="h-[1px] bg-slate-800 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 text-slate-400">
            <p className="text-lg">
              Para mí, desarrollar no es solo escribir código, es resolver problemas del mundo real. Mediante el desarrollo de mis <strong className="text-blue-400 font-semibold underline decoration-blue-500/20">prácticas preprofesionales</strong> pude poner a prueba mis conocimientos y enfrentarme a problemas de desarrollo reales, donde tuve que buscar soluciones creativas a problemas durante el desarrollo de mis actividades.
            </p>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <p className="text-blue-400 font-mono text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Code2 size={16}/> Tecnologías principales:
              </p>
              <ul className="grid grid-cols-2 gap-4 font-mono text-xs">
                <li className="flex items-center gap-2 text-slate-300"><Database size={14} className="text-blue-500/50"/> Python / Django</li>
                <li className="flex items-center gap-2 text-slate-300"><Cpu size={14} className="text-blue-500/50"/> PostgreSQL</li>
                <li className="flex items-center gap-2 text-slate-300"><Code2 size={14} className="text-blue-500/50"/> React.js</li>
                <li className="flex items-center gap-2 text-slate-300"><Database size={14} className="text-blue-500/50"/> MongoDB</li>
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

      {/* SECCIÓN 3: PROYECTOS */}
      <section id="proyectos" className="py-32 px-6 max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-100 italic"><span className="text-blue-400 font-mono not-italic text-xl mr-2">02.</span> Portafolio Técnico</h2>
          <div className="h-[1px] bg-slate-800 flex-grow"></div>
        </div>
        <ProjectList />
      </section>



    </div>
  );
}

export default App;