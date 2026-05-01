import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoApp from '../assets/dailymind_logo.png';
import moodIcon from '../assets/mood.png';
import todoIcon from '../assets/todo.png';
import pomodoroIcon from '../assets/pomodoro.png';
import jurnalIcon from '../assets/jurnal.png';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const keRegister = () => navigate('/register');
  const keLogin = () => navigate('/login');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'fitur', 'tentang'];
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="min-h-screen font-sans scroll-smooth relative">
      <section className="min-h-screen bg-gradient-to-b from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
      {/* 1. NAVBAR - Floating Navigation */} 
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-blue-400/40 backdrop-blur-3xl border border-white/40 px-8 py-3 rounded-full flex items-center justify-between w-full max-w-5xl shadow-sm">
          <div className="flex items-center gap-3">
            <img
               src={LogoApp}
               alt="dailymind_logo"
               className="w-35 h-10 object-contain hover:scale-105 transition duration-300"
               style={{
                filter:'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2))'
               }}
               />
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[#ffffff] font-manrope font-semibold">
            <a href="#home" className={`transition duration-300 ${activeSection === 'home' ? 'text-[#1F2A44]' : 'text-white'}`}>Home</a>
            <a href="#fitur" className={`transition duration-300 ${activeSection === 'fitur' ? 'text-[#1F2A44]' : 'text-white'}`}>Fitur</a>
            <a href="#tentang" className={`transition duration-300 ${activeSection === 'tentang' ? 'text-[#1F2A44]' : 'text-white'}`}>Tentang</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={keRegister} className="bg-[#1F2A44] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-black transition">Daftar</button>
            <button onClick={keLogin} className="bg-white/60 text-[#1F2A44] px-6 py-2 rounded-full text-sm font-semibold hover:bg-white transition border border-white/20">Masuk</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="pt-30 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen">
        <div className="md:w-1/2 pt-30">
          <h1 className="text-6xl font-bold text-[#1F2A44] mb-6 ml-5">Daily Mind</h1>
          <p className="font-inter text-[#1F2A44] text-[20px] leading-relaxed mb-10 max-w-lg opacity-80 ml-5">
            Tempat aman untuk menuangkan pikiran, melacak mood, dan dapat meningkatkan produktivitas. Semua dalam satu aplikasi yang tenang dan personal.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={keRegister} className="bg-[#1F2A44] text-white px-8 py-2.5 rounded-2xl font-sarabun text-lg flex items-center gap-2 hover:scale-105 transition shadow-lg ml-5">
              Mulai Sekarang <span>→</span>
            </button>
            <button onClick={keLogin} className="bg-white/40 text-[#1F2A44] px-8 py-2.5 rounded-2xl font-sarabun text-lg hover:bg-white/60 transition border border-white/20 ml-5">
              Sudah Punya Akun
            </button>
          </div>
        </div>
        
        {/* Placeholder for Image */}
        <div className="md:w-4/12 mt-20 md:mt-5 mr-10">
          <div className="w-full aspect-square bg-[#D9D9D9] rounded-3xl shadow-xl flex items-center justify-center text-gray-400">
            {/* Taruh Gambar Hero Kamu di sini */}
            [IMAGE PLACEHOLDER]
          </div>
        </div>
      </section>
    </section>
  

      {/* 3. FEATURES SECTION */}
      <section id="fitur" className="py-24 px-6 max-w-7xl mx-auto text-center bg-gradient-to-b from-[#E0C3FC] to-[#C2E9FB]">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1F2A44] mb-4">Semua yang kamu butuhkan</h2>
        <p className="text-[#4A5568] text-lg mb-16">Fitur lengkap untuk mendukung keseharian dan produktivitas kamu setiap hari</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mr-5 ml-5">
          {/* Card Component */}
          {[
            { title: 'Mood Tracker', desc: 'Lacak perjalanan emosionalmu dengan visualisasi yang indah', icon: moodIcon },
            { title: 'To - Do List', desc: 'Kelola tugas harianmu dengan sederhana dan efektif', icon: todoIcon },
            { title: 'Pomodoro Timer', desc: 'Tingkatkan fokus dengan teknik produktivitas yang terbukti', icon: pomodoroIcon },
            { title: 'Jurnaling', desc: 'Mencatata refleksi harian untuk memahami perasaanmu', icon: jurnalIcon },
          ].map((feature) => (
            <div key={feature.title} className="bg-white/60 backdrop-blur-sm p-8 rounded-[40px] border border-white/40 text-left hover:translate-y-[-10px] transition duration-300 shadow-sm">
              <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6">
               <img
                 src={feature.icon}
                 alt={feature.title}
                 className="w-10 h-10 object-contain"
                 />
            </div>
            <h3 className="font-bold text-[#1F2A44] text-lg mb-2">
              {feature.title}
              </h3>
              <p className="text-[#1F2A44] opacity-70 text-sm leading-relaxed">
                {feature.desc}
                </p>
          </div>
          ))}
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section id="tentang" className="py-32 px-6 flex justify-center bg-gradient-to-b from-[#C2E9FB] to-[#A1C4FD]">
        <div className="bg-white/40 backdrop-blur-lg border border-white/50 w-full max-w-5xl rounded-[60px] py-20 px-10 text-center shadow-xl">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1F2A44] mb-6">Mulai Perjalananmu Hari Ini</h2>
          <p className="text-[#1F2A44] text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80">
            Bergabunglah dengan ribuan orang yang telah menemukan ketenangan dan produktivitas melalui daily mind
          </p>
          <button className="bg-[#1F2A44] text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto hover:bg-black transition shadow-lg">
            Daftar Sekarang <span>→</span>
          </button>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-10 text-center text-[#1F2A44] font-medium opacity-70 bg-[#7fadf7]">
        <div className="h-[1px] bg-[#1F2A44]/10 w-full mb-10"></div>
        <p>© 2026. Daily Mind. Tempat Pribadi untuk perkembangan diri</p>
      </footer>

    </div>
  );
};

export default LandingPage;