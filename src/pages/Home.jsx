import React, { useEffect, useState } from 'react';

const Home = () => {

  // ================= TODOS =================
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('dailyMind_todos')) || [];
  });

  const loadTodos = () => {
    const data = JSON.parse(localStorage.getItem('dailyMind_todos')) || [];
    setTodos(data);
  }

  // ================= JOURNALS =================
  const [journals, setJournals] = useState(() => {
    return JSON.parse(localStorage.getItem('dailyMind_jurnal')) || [];
  });

  const loadJournals = () => {
    const data = JSON.parse(localStorage.getItem('dailyMind_jurnal')) || [];
    setJournals(data);
  };

  // ================= EFFECT =================
  useEffect(() => {

    const handleUpdate = () => {
      loadTodos();
      loadJournals(); // 🔥 ambil jurnal juga
    };

    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // load awal
  useEffect(() => {
    loadJournals();
  }, []);

  return (
    <div 
      className="min-h-screen font-inter flex flex-col h-screen overflow-hidden" 
      style={{
        background: 'bg-gradient-to-br  from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]'
      }}
    >
      {/* AREA UTAMA */}
      <div className="flex-1 flex flex-col pt-0 h-screen overflow-hidden">
        
        {/* HEADER */}
        <div className="flex gap-8 mb-2 flex-shrink-0 items-center border-b-2 border-white/90 pb-5 bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
          
          <div className="flex-[2.5] ml-10">
            <h1 className="text-[42px] font-black text-[#1F2A44] font-manrope tracking-tight mb-0 mt-0 leading-tight">
              How Is Your Mood Today?
            </h1>
            <div className="flex items-center max-w-3xl mt-3">
              <input 
                type="text" 
                placeholder="Tulis Disini" 
                className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 py-2 px-8 rounded-full shadow-sm focus:outline-none text-[#1F2A44] font-medium"
              />
              <button className="ml-3 w-8 h-8 flex items-center justify-center border-2 border-[#1F2A44] rounded-full text-[#1F2A44] font-bold hover:bg-[#1F2A44] hover:text-white transition duration-300">
                <span className="-mt-[1px]">+</span>
              </button>
            </div>
          </div>

          {/* Mood Streak */}
          <div className="w-64 shrink-0 mr-8 mt-8">
            <div className="bg-[#1F2A44] p-7 rounded-[40px] text-white flex flex-col items-center shadow-xl transform transition hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="text-6xl font-black font-manrope">200</span>
                <span className="text-4xl">🔥</span>
              </div>
              <p className="text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase mt-1">Mood Streak</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex gap-8 flex-1 overflow-hidden pb-0">
          
          {/* ================= KOLOM JURNAL ================= */}
          <div className="flex-[2.5] overflow-y-auto pr-4 custom-scrollbar space-y-6 ml-10 mt-5">

            {journals.length === 0 ? (
              <div className="bg-white/90 p-8 rounded-[35px] shadow-sm border border-white/20">
                <p className="text-gray-400 text-center">
                  Belum ada jurnal
                </p>
              </div>
            ) : (
              journals.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white/90 p-8 rounded-[35px] shadow-sm border border-white/20 transition-all duration-300 hover:shadow-lg"
                >
                  <p className="text-[#1F2A44]/60 text-sm mb-2">
                    {item.date}
                  </p>
                  <p className="text-[#1F2A44]/80 leading-relaxed text-[15px] font-medium">
                    {item.content}
                  </p>
                </div>
              ))
            )}

          </div>

          {/* ================= SIDE ================= */}
          <div className="w-64 flex-shrink-0 flex flex-col gap-6 h-full overflow-hidden mt-5 mr-8">

            {/* Daily Mission */}
            <div className="bg-white/40 backdrop-blur-md p-7 rounded-[20px] border border-white/40 shadow-sm">
              <h3 className="font-bold text-[#1F2A44] mt-[-20px] mb-3 text-center font-manrope text-lg">Daily Mission</h3>
              <div className="space-y-2">
                <div className="bg-white/70 p-2 rounded-2xl text-[12px] text-center border border-white/20 shadow-sm font-semibold">Ajak Kenalan 1 Orang baru di kampus</div>
                <div className="bg-white/70 p-2 rounded-2xl text-[12px] text-center border border-white/20 shadow-sm font-semibold">Push Up 10 x</div>
                <div className="bg-white/70 p-2 rounded-2xl text-[12px] text-center border border-white/20 shadow-sm font-semibold">Jangan Buka Medsos 2 Jam</div>
              </div>
            </div>

            {/* To-Do */}
            <div className="h-[300px] bg-white p-7 rounded-[40px] shadow-sm flex flex-col border border-blue-50/50">
              <h3 className="font-bold text-[#1F2A44] text-center mb-2 font-manrope text-lg mt-[-20px]">
                To-Do List
              </h3>

              <ul className={`flex-1 overflow-y-auto custom-scrollbar text-[13px] font-inter font-medium leading-relaxed ${
                todos.length === 0 ? "" : "list-disc pl-5 text-[#1F2A44]/80"
              }`}>
                {todos.length === 0 ? (
                  <li className="text-center text-gray-400 text-sm list-none">
                    Belum ada todo
                  </li>
                ) : (
                  todos.map(todo => (
                    <li key={todo.id} className="mb-1">
                      {todo.text}
                    </li>
                  ))
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default Home;