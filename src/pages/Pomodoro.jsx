import { useState, useEffect, useRef } from "react";
import alarmSound from "../assets/alarm.mp3"

export default function Pomodoro() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const hasCounted = useRef(false);

  const alarmRef = useRef(null);

  useEffect(() => {
    alarmRef.current = new Audio(alarmSound);
  }, []);

  const [sessions, setSessions] = useState(() => {
  const today = new Date().toLocaleDateString();
  const lastDate = localStorage.getItem("lastDate");

  if (lastDate !== today) {
    localStorage.setItem("lastDate", today);
    localStorage.setItem("sessionsCount", "0");
    return 0;
  }

  const savedSessions = localStorage.getItem("sessionsCount");
  return savedSessions ? parseInt(savedSessions) : 0;
  });

  // Logika Waktu
  useEffect(() => {
  if (!isRunning) return;

  const timeout = setTimeout(() => {
    setTimeLeft((prev) => {
      if (prev === 1) {

        alarmRef.current?.play();

        setIsRunning(false);

        if (mode === "work") {

          if (!hasCounted.current) {
            setSessions((s) => s + 1);
            hasCounted.current = true;
          }

          setTimeout(() => {
            setMode("break");
            setTimeLeft(BREAK_TIME);

            setIsRunning(true);
          }, 5000);

          return 0;

        } else {
          setTimeout(() => {
            setMode("work");
            setTimeLeft(WORK_TIME);

            setIsRunning(false);
          }, 5000);

          return 0;
        }
      }

      if (prev > 1) {
        hasCounted.current = false;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearTimeout(timeout);
}, [isRunning, mode, timeLeft, BREAK_TIME, WORK_TIME]);

  // Format Waktu
  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Circle Progress
  const TOTAL = mode === "work" ? WORK_TIME : BREAK_TIME;
  const radius = 220;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / TOTAL;
  const offset = circumference * (1 - progress);

  // Simpan ke localStorage tiap sessions nambah
  useEffect(() => {
    localStorage.setItem("sessionsCount", sessions);
  }, [sessions])

  return (
    <div className="flex flex-col min-h-full gap-8 p-8 w-full">
      <div className="h-16 w-screen text-left p-2 m-0">
        <h1 className="font-bold text-4xl">Pomodoro Timer</h1>
        <p className="font-medium text-xl">Tingkatkan produktivitas dengan pomodoro</p>
      </div>
      <div className="flex gap-6 p-10 px-0">

      {/* LEFT - TIMER */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full text-center">

        {/* Mode Button */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => {
              setMode("work");
              setTimeLeft(WORK_TIME);
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-full font-semibold w-[200px] h-[42px] ${
              mode === "work" ? "bg-red-400 hover:bg-[#C91414] text-white" : "bg-gray-200 hover:bg-[#A8A8A8]"
            }`}
          >
            Kerja (25 Menit)
          </button>

          <button
            onClick={() => {
              setMode("break");
              setTimeLeft(BREAK_TIME);
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-full w-[200px] h-[42px] ${
              mode === "break" ? "bg-[#8AE847] text-white" : "bg-gray-200 hover:bg-[#A8A8A8]"
            }`}
          >
            Istirahat (5 Menit)
          </button>
        </div>

        {/* Circle */}
        <div className="relative flex justify-center items-center mb-6">
          <svg width="480" height="480" className="rotate-[-90deg]">
            <circle
              cx="240"
              cy="240"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="240"
              cy="240"
              r={radius}
              stroke={mode === "work" ? "#FF533D" : "#8AE847"}
              strokeWidth="20"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          <div className="absolute text-center">
            <p className="text-7xl font-bold">{formatTime(timeLeft)}</p>
            <p className="text-gray-500 text-xl">
              {mode === "work" ? "Waktu Kerja" : "Waktu Istirahat"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 text-white font-bold rounded-xl w-[152px] h-[52px] shadow ${
              mode === "work" ? "bg-[#FF533D] hover:bg-[#C91414]" : "bg-[#8AE847] hover:bg-[#26BA16]"
            }`}
          >
            {isRunning ? "Pause" : "Mulai"}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
            }}
            className="px-6 py-2 bg-gray-200 hover:bg-[#A8A8A8] rounded-xl w-[152px] h-[52px] shadow"
          >
            Reset
          </button>
        </div>
      </div>

      {/* RIGHT - STATISTIK */}
      <div className="flex flex-col gap-6">

        {/* Statistik */}
        <div className="bg-white p-6 rounded-2xl shadow w-full min-h-[200px] text-center flex flex-col items-center justify-center">
          <h2 className="font-extrabold text-2xl mb-2">Statistik Hari Ini</h2>
          <p className="text-4xl font-bold text-red-400">{sessions}</p>
          <p className="text-gray-500 text-md">Sesi Hari Ini</p>
        </div>

        {/* Cara Pakai */}
        <div className="bg-[#FFB4B440]/25 p-6 rounded-2xl shadow w-full min-h-[460px] text-center flex flex-col gap-6">
          <h2 className="font-extrabold text-3xl mb-2">Cara Menggunakan</h2>
          <ol className="list-decimal ml-4 text-2md text-justify space-y-1 flex flex-col gap-4">
            <li>Pilih mode "kerja" dan mulai timer.</li>
            <li>Fokus pada satu tugas selama 25 menit.</li>
            <li>Istirahat 5 menit setelah alarm berbunyi.</li>
            <li>Ulangi sebanyak 4 kali, lalu ambil istirahat panjang selama 15-30 menit.</li>
          </ol>
        </div>
      </div>
    </div>
    </div>
  )
}