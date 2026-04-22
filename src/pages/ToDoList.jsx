import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToDoList() {
  // Pancing linter agar tahu motion dipakai (opsional jika masih merah)
  const isMotionReady = !!motion; 

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('dailyMind_todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem('dailyMind_count');
    return saved ? parseInt(saved) : 0;
  });

  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Sedang");

  useEffect(() => {
    localStorage.setItem('dailyMind_todos', JSON.stringify(todos));
    localStorage.setItem('dailyMind_count', completedCount.toString());
  }, [todos, completedCount]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "" || !isMotionReady) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      priority: priority,
      isChecking: false
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleCheck = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, isChecking: true } : t));
    setTimeout(() => {
      setTodos(prev => prev.filter(t => t.id !== id));
      setCompletedCount(prev => prev + 1);
    }, 600);
  };

  const totalTugas = todos.length + completedCount;
  const progressPercent = totalTugas === 0 ? 0 : Math.round((completedCount / totalTugas) * 100);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex flex-col min-h-screen gap-8 w-full">
        
        {/* Menggunakan motion.header */}
        <motion.header 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          <h1 className="font-bold text-4xl">To-Do-List</h1>
          <p className="text-gray-500">Kelola tugasmu dengan lebih cerdas.</p>
        </motion.header>

        <div className="flex justify-space-between gap-6 item-center h-40">
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Total Tugas</h2>
            <h2 className="text-xl font-semibold">{todos.length}</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Aktif</h2>
            <h2 className="text-xl font-semibold text-[#0059FF]">{todos.length}</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Selesai</h2>
            <h2 className="text-xl font-semibold text-[#00FF00]">{completedCount}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap md:flex-nowrap gap-3 border border-gray-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            className="peer flex-grow p-3 rounded-xl outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]"
            placeholder="Ketik tugas baru..."
          />
          
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="peer p-3 rounded-xl bg-white outline-2 outline-[#000000]/30"
          >
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Rendah">Rendah</option>
          </select>

          <button onClick={handleAddTodo} className="bg-[#ABE3A9] px-6 py-3 rounded-xl font-bold text-white peer-focus:bg-[#09EB00CC] transition-all">
            Tambah
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {todos.length > 0 && (
            <motion.div 
              key="todo-content"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex justify-between mb-4 font-bold text-gray-700">
                  <span>Progress Hari Ini</span>
                  <span className="text-[#09EB00CC]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-[#09EB00CC]"
                  />
                </div>
              </div>

              <div className="space-y-4 pb-20">
                {todos.map(todo => (
                  <TaskBox key={todo.id} todo={todo} onCheck={() => handleCheck(todo.id)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TaskBox({ todo, onCheck }) {
  const colors = {
    Tinggi: "bg-[#FFE5E5] border-[#FF9999]",
    Sedang: "bg-[#FFF9E5] border-[#FFE082]",
    Rendah: "bg-[#E5FFE7] border-[#99FFAB]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      className={`flex items-center p-5 rounded-2xl border-2 shadow-sm ${colors[todo.priority]}`}
    >
      <input 
        type="checkbox" 
        className="w-6 h-6 mr-4 accent-[#09EB00CC] cursor-pointer" 
        onChange={onCheck} 
      />
      <span className={`flex-grow font-semibold text-lg ${todo.isChecking ? 'line-through text-gray-400 italic' : 'text-gray-800'}`}>
        {todo.text}
      </span>
      <span className="text-[10px] font-black uppercase px-3 py-1 bg-white/60 rounded-2xl">
        {todo.priority}
      </span>
    </motion.div>
  );
}