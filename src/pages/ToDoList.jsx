import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToDoList() {
  // eslint-disable-next-line no-unused-vars
  const isMotionReady = !!motion; 

  const [isFocused, setIsFocused] = useState(false);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('dailyMind_todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem('dailyMind_count');
    return saved ? parseInt(saved) : 0;
  });

  const [inputValue, setInputValue] = useState("");
  // Set tanggal default = hari ini
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem('dailyMind_todos', JSON.stringify(todos));
    localStorage.setItem('dailyMind_count', completedCount.toString());
  }, [todos, completedCount]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "" || !deadline) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      deadline: deadline, // Simpan tanggal deadline
      isChecking: false
    };
    // Urutkan otomatis: yang paling dekat deadlinenya di atas
    setTodos([...todos, newTodo].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
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
    <div className="flex justify-center items-center p-10">
      <div className="flex flex-col min-h-screen gap-8 w-full">
        
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-bold text-4xl">To-Do-List</h1>
          <p className="text-gray-700 font-semibold">Kelola tugasmu berdasarkan deadline.</p>
        </motion.header>

        {/* STATS BOXES (Tetap sesuai desainmu) */}
        <div className="flex justify-between gap-6 items-center h-40">
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Total</h2>
            <h2 className="text-xl font-semibold">{todos.length}</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Aktif</h2>
            <h2 className="text-xl font-semibold text-[#0059FF]">{todos.length}</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Selesai</h2>
            <h2 className="text-xl font-semibold text-[#00FF00]">{completedCount}</h2>
          </div>
        </div>

        {/* Input Tugas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap md:flex-nowrap gap-3 border border-gray-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="peer flex-grow p-3 rounded-xl outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]"
            placeholder="Ketik tugas baru..."
          />
          
          {/* Calendar Deadline */}
          <input 
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="peer p-3 rounded-xl bg-white outline-2 outline-[#000000]/30 cursor-pointer"
          />

          <button onClick={handleAddTodo} className={`px-6 py-3 rounded-xl font-bold text-white transition-all ${
            isFocused ? "bg-[#09EB00CC]" : "bg-[#ABE3A9]"
          }`}>
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

              <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-2">
                <label className="text-[20px] font-medium-500">Tugas Aktif</label>
                <div className="space-y-4">
                  {todos.map(todo => (
                    <TaskBox key={todo.id} todo={todo} onCheck={() => handleCheck(todo.id)} />
                  ))}
               </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TaskBox({ todo, onCheck }) {
  // LOGIKA WARNA BERDASARKAN WAKTU (Tetap pakai gaya warna aslimu)
  const getPriorityStyle = (targetDate) => {
    const diff = new Date(targetDate) - new Date().setHours(0,0,0,0);
    const days = diff / (1000 * 60 * 60 * 24);
    
    if (days <= 2) return { color: "bg-[#FFE5E5] border-[#FF9999]", label: "Mendesak" };
    if (days <= 4) return { color: "bg-[#FFF9E5] border-[#FFE082]", label: "Dekat" };
    return { color: "bg-[#E5FFE7] border-[#99FFAB]", label: "Aman" };
  };

  const status = getPriorityStyle(todo.deadline);

  return (
    
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      className={`flex items-center p-5 rounded-2xl border-2 shadow-xl ${status.color}`}
    >
      <input 
        type="checkbox" 
        className="w-6 h-6 mr-4 accent-[#09EB00CC] cursor-pointer" 
        onChange={onCheck} 
      />
      <div className="flex flex-col gap-2 flex-grow">
        <span className={`font-semibold text-lg ${todo.isChecking ? 'line-through text-gray-400 italic' : 'text-gray-800'}`}>
          {todo.text}
        </span>
        <span className={`text-xs text-gray-500 text-center font-medium px-3 py-1 rounded-2xl w-[150px] border-2 border ${status.color.split(' ')[1]}`}>Deadline: {todo.deadline}</span>
      </div>
      <span className={`w-[100px] text-[10px] text-center font-bold uppercase px-3 py-1 rounded-2xl border-2 border ${status.color.split(' ')[1]}`}>
        {status.label}
      </span>
    </motion.div>
  );
}