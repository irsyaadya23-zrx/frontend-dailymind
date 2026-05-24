import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import LogoApp from '../assets/dailymind_logo.png';
import moodIcon from '../assets/mood.png';
import todoIcon from '../assets/todo.png';
import pomodoroIcon from '../assets/pomodoro.png';
import jurnalIcon from '../assets/jurnal.png';

const LandingPage = () => {

  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const keRegister = () => navigate('/register');
  const keLogin = () => navigate('/login');

  // ================= ACTIVE SECTION =================
  useEffect(() => {

    const handleScroll = () => {

      const sections = ['home', 'fitur', 'tentang'];
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {

        const element = document.getElementById(section);

        if (element) {

          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }

      });

    };

    window.addEventListener('scroll', handleScroll);

    return () =>
      window.removeEventListener('scroll', handleScroll);

  }, []);

  // ================= CLOSE MOBILE MENU =================
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <div className="min-h-screen scroll-smooth relative overflow-x-hidden">

      {/* ================= HERO BG ================= */}
      <section className="min-h-screen bg-gradient-to-b from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">

        {/* ================= NAVBAR ================= */}
        <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 font-['Manrope']">

          <div className="
            bg-blue-400/40
            backdrop-blur-3xl
            border
            border-white/40
            px-4
            md:px-8
            py-3
            rounded-3xl
            md:rounded-full
            flex
            items-center
            justify-between
            w-full
            max-w-5xl
            shadow-sm
          ">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <img
                src={LogoApp}
                alt="dailymind_logo"
                className="
                  w-28
                  md:w-35
                  h-10
                  object-contain
                  hover:scale-105
                  transition
                  duration-300
                "
                style={{
                  filter:
                    'drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.2))'
                }}
              />

            </div>

            {/* DESKTOP MENU */}
            <div className="
              hidden
              md:flex
              items-center
              gap-10
              text-[#ffffff]
              font-manrope
              font-semibold
            ">

              <a
                href="#home"
                className={`transition duration-300 ${
                  activeSection === 'home'
                    ? 'text-[#1F2A44]'
                    : 'text-white'
                }`}
              >
                Home
              </a>

              <a
                href="#fitur"
                className={`transition duration-300 ${
                  activeSection === 'fitur'
                    ? 'text-[#1F2A44]'
                    : 'text-white'
                }`}
              >
                Fitur
              </a>

              <a
                href="#tentang"
                className={`transition duration-300 ${
                  activeSection === 'tentang'
                    ? 'text-[#1F2A44]'
                    : 'text-white'
                }`}
              >
                Tentang
              </a>

            </div>

            {/* DESKTOP BUTTON */}
            <div className="hidden md:flex items-center gap-3">

              <button
                onClick={keRegister}
                className="
                  bg-[#1F2A44]
                  text-white
                  px-6
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  hover:bg-black
                  transition
                "
              >
                Daftar
              </button>

              <button
                onClick={keLogin}
                className="
                  bg-white/60
                  text-[#1F2A44]
                  px-6
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  hover:bg-white
                  transition
                  border
                  border-white/20
                "
              >
                Masuk
              </button>

            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                md:hidden
                text-[#1F2A44]
                p-2
              "
            >

              {menuOpen ? <X size={28} /> : <Menu size={28} />}

            </button>

          </div>

        </nav>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (

          <div className="
            fixed
            top-24
            left-4
            right-4
            z-40
            md:hidden
            bg-white/70
            backdrop-blur-2xl
            border
            border-white/40
            rounded-3xl
            p-6
            shadow-xl
            flex
            flex-col
            gap-5
          ">

            <a
              href="#home"
              onClick={closeMenu}
              className="font-semibold text-[#1F2A44]"
            >
              Home
            </a>

            <a
              href="#fitur"
              onClick={closeMenu}
              className="font-semibold text-[#1F2A44]"
            >
              Fitur
            </a>

            <a
              href="#tentang"
              onClick={closeMenu}
              className="font-semibold text-[#1F2A44]"
            >
              Tentang
            </a>

            <div className="flex flex-col gap-3 pt-3">

              <button
                onClick={keRegister}
                className="
                  bg-[#1F2A44]
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >
                Daftar
              </button>

              <button
                onClick={keLogin}
                className="
                  bg-white/80
                  text-[#1F2A44]
                  py-3
                  rounded-2xl
                  font-semibold
                  border
                  border-white/40
                "
              >
                Masuk
              </button>

            </div>

          </div>

        )}

        {/* ================= HERO SECTION ================= */}
        <section
          id="home"
          className="
            pt-36
            md:pt-50
            pb-20
            px-6
            max-w-7xl
            mx-auto
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            min-h-screen
            gap-10
          "
        >

          {/* LEFT */}
          <div className="md:w-full text-center md:text-left">

            <h1 className="
              text-5xl
              md:text-6xl
              font-bold
              text-[#1F2A44]
              mb-6
              md:ml-5
            ">
              Daily Mind
            </h1>

            <p className="
              font-inter
              text-[#1F2A44]
              text-[16px]
              md:text-[20px]
              font-semibold
              leading-relaxed
              mb-10
              max-w-lg
              opacity-80
              md:ml-5
              mx-auto
              md:mx-0
            ">

              Tempat aman untuk menuangkan pikiran,
              melacak mood, dan dapat meningkatkan
              produktivitas. Semua dalam satu aplikasi
              yang tenang dan personal.

            </p>

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-4
              justify-center
              md:justify-start
            ">

              <button
                onClick={keRegister}
                className="
                  bg-[#1F2A44]
                  text-white
                  px-8
                  py-3
                  rounded-2xl
                  font-sarabun
                  text-lg
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:scale-105
                  transition
                  shadow-lg
                  md:ml-5
                "
              >
                Mulai Sekarang <span>→</span>
              </button>

              <button
                onClick={keLogin}
                className="
                  bg-white/40
                  text-[#1F2A44]
                  px-8
                  py-3
                  rounded-2xl
                  font-sarabun
                  text-lg
                  hover:bg-white/60
                  transition
                  border
                  border-white/20
                  md:ml-5
                "
              >
                Sudah Punya Akun
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="
            w-full
            md:w-5/12
            mt-6
            md:mt-5
            md:mr-10
          ">

            <div className="
              w-full
              aspect-square
              bg-[#D9D9D9]
              rounded-3xl
              shadow-xl
              overflow-hidden
            ">

              <img src="/gambar landing page.png" className="w-full h-full object-cover"/>

            </div>

          </div>

        </section>

      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="fitur"
        className="
          py-24
          md:py-40
          w-full
          bg-gradient-to-b
          from-[#E0C3FC]
          to-[#C2E9FB]
        "
      >

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="
            text-3xl
            md:text-5xl
            font-bold
            text-[#1F2A44]
            mb-4
          ">
            Semua yang kamu butuhkan
          </h2>

          <p className="
            text-[#4A5568]
            text-base
            md:text-lg
            font-semibold
            mb-16
          ">
            Fitur lengkap untuk mendukung keseharian
            dan produktivitas kamu setiap hari
          </p>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">

            {[
              {
                title: 'Mood Tracker',
                desc: 'Lacak perjalanan emosionalmu dengan visualisasi yang indah',
                icon: moodIcon
              },
              {
                title: 'To - Do List',
                desc: 'Kelola tugas harianmu dengan sederhana dan efektif',
                icon: todoIcon
              },
              {
                title: 'Pomodoro Timer',
                desc: 'Tingkatkan fokus dengan teknik produktivitas yang terbukti',
                icon: pomodoroIcon
              },
              {
                title: 'Jurnaling',
                desc: 'Mencatata refleksi harian untuk memahami perasaanmu',
                icon: jurnalIcon
              },
            ].map((feature) => (

              <div
                key={feature.title}
                className="
                  bg-white/60
                  backdrop-blur-sm
                  p-8
                  rounded-[40px]
                  border
                  border-white/40
                  text-left
                  hover:translate-y-[-10px]
                  transition
                  duration-300
                  shadow-sm
                "
              >

                <div className="
                  w-14
                  h-14
                  bg-white/80
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shadow-sm
                  mb-6
                ">

                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10 object-contain"
                  />

                </div>

                <h3 className="
                  font-bold
                  text-[#1F2A44]
                  text-lg
                  mb-2
                ">
                  {feature.title}
                </h3>

                <p className="
                  text-[#1F2A44]
                  opacity-70
                  text-sm
                  leading-relaxed
                ">
                  {feature.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section
        id="tentang"
        className="
          py-24
          md:py-32
          px-6
          flex
          justify-center
          bg-gradient-to-b
          from-[#C2E9FB]
          to-[#A1C4FD]
        "
      >

        <div className="
          bg-white/40
          backdrop-blur-lg
          border
          border-white/50
          w-full
          max-w-5xl
          rounded-[40px]
          md:rounded-[60px]
          py-14
          md:py-20
          px-6
          md:px-10
          text-center
          shadow-xl
        ">

          <h2 className="
            text-3xl
            md:text-6xl
            font-bold
            text-[#1F2A44]
            mb-6
          ">
            Mulai Perjalananmu Hari Ini
          </h2>

          <p className="
            text-[#1F2A44]
            text-base
            md:text-xl
            mb-10
            max-w-2xl
            mx-auto
            opacity-80
          ">

            Bergabunglah dengan ribuan orang yang telah
            menemukan ketenangan dan produktivitas
            melalui daily mind

          </p>

          <button
            onClick={keRegister}
            className="
              bg-[#1F2A44]
              text-white
              px-8
              md:px-10
              py-4
              md:py-5
              rounded-2xl
              font-bold
              text-lg
              md:text-xl
              flex
              items-center
              gap-3
              mx-auto
              hover:bg-black
              transition
              shadow-lg
            "
          >

            Daftar Sekarang <span>→</span>

          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="
        py-10
        text-center
        text-[#1F2A44]
        font-medium
        opacity-70
        bg-[#7fadf7]
        px-4
      ">

        <div className="
          h-[1px]
          bg-[#1F2A44]/10
          w-full
          mb-10
        " />

        <p className="text-sm md:text-base">
          © 2026. Daily Mind. Tempat Pribadi untuk perkembangan diri
        </p>

      </footer>

    </div>
  );
};

export default LandingPage;