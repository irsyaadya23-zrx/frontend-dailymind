import { useState, useEffect, useRef } from "react";
import alarmSound from "../assets/alarm.mp3";

export default function Pomodoro() {

  // CONSTANT

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  // BACKEND URL

  const API_URL_POMODORO = import.meta.env.VITE_API_URL_POMODORO;

  // STATE

  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState(0);

  const [loading, setLoading] = useState(true);

  // REF
 
  const hasCounted = useRef(false);

  const alarmRef = useRef(null);

  // LOAD AUDIO

  useEffect(() => {
    alarmRef.current = new Audio(alarmSound);
  }, []);

  // GET ALL POMODOROS

  useEffect(() => {

  const getPomodoros = async () => {

    try {

      const response = await fetch(API_URL_POMODORO, {

        method: "GET",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
      });

      // BELUM LOGIN
      if (response.status === 401) {

        console.log("Belum login");

        setSessions(0);

        return;
      }

      if (!response.ok) {
        throw new Error("Gagal mengambil pomodoro");
      }

      const data = await response.json();

      console.log("GET POMODOROS:", data);

      // SUPPORT MULTIPLE FORMAT
      const pomodoros =
        data.pomodoros ||
        data.data ||
        data ||
        [];

      // TANGGAL HARI INI
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      // FILTER HARI INI
      const todaySessions =
        pomodoros.filter((item) => {

          const itemDate =
            new Date(
              item.createdAt ||
              item.date
            )
              .toISOString()
              .split("T")[0];

          return itemDate === today;
        });

      setSessions(
        todaySessions.length
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  getPomodoros();

}, []);

  // SAVE SESSION
 
  const saveSession = async () => {

  try {

    const response = await fetch(
      API_URL_POMODORO,
      {

        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          duration: 25,
          mode: "work",
        }),
      }
    );

    // BELUM LOGIN
    if (response.status === 401) {

      console.log(
        "User belum login"
      );

      return;
    }

    if (!response.ok) {
      throw new Error(
        "Gagal menyimpan pomodoro"
      );
    }

    const data =
      await response.json();

    console.log(
      "SAVE POMODORO:",
      data
    );

    // TAMBAH SESSION HARI INI
    setSessions((prev) => prev + 1);

  } catch (error) {

    console.error(error);
  }
};

  // TIMER

  useEffect(() => {

    if (!isRunning) return;

    const timeout = setTimeout(() => {

      setTimeLeft((prev) => {

        // TIMER SELESAI
        if (prev === 1) {

          // PLAY SOUND
          alarmRef.current?.play();

          setIsRunning(false);

          // MODE WORK
          if (mode === "work") {

            if (!hasCounted.current) {

              saveSession();

              hasCounted.current = true;

            }

            // AUTO BREAK
            setTimeout(() => {

              setMode("break");

              setTimeLeft(BREAK_TIME);

              setIsRunning(true);

            }, 5000);

            return 0;
          }

          // MODE BREAK
          else {

            setTimeout(() => {

              setMode("work");

              setTimeLeft(WORK_TIME);

              setIsRunning(false);

            }, 5000);

            return 0;
          }
        }

        // RESET FLAG
        if (prev > 1) {
          hasCounted.current = false;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearTimeout(timeout);

  }, [isRunning, mode]);

  // FORMAT TIME

  const formatTime = (time) => {

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

  };

  // RESPONSIVE RADIUS

  const radius =
    window.innerWidth < 640
      ? 120
      : 220;

  // CIRCLE PROGRESS

  const TOTAL =
    mode === "work"
      ? WORK_TIME
      : BREAK_TIME;

  const circumference =
    2 * Math.PI * radius;

  const progress =
    timeLeft / TOTAL;

  const offset =
    circumference * (1 - progress);

  // LOADING

  if (loading) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-[#E0C3FC] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-[#E0C3FC] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-[#E0C3FC] rounded-full animate-bounce"></span>
      </div>
    </div>
  );
}

  return (

    <div className="w-full min-h-screen px-4 py-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
          Pomodoro Timer
        </h1>
        <p className="text-gray-700 font-medium text-sm sm:text-base">
          Tingkatkan produktivitas dengan pomodoro
        </p>
      </div>

      {/* MAIN */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* LEFT */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 flex-1">

          {/* MODE BUTTON */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">

            {/* WORK */}
            <button
              onClick={() => {
                setMode("work");
                setTimeLeft(WORK_TIME);
                setIsRunning(false);
              }}
              className={`px-4 py-2 rounded-full font-semibold w-full sm:w-[200px] h-[45px] transition ${
                mode === "work"
                  ? "bg-red-400 hover:bg-[#C91414] text-white"
                  : "bg-gray-200 hover:bg-[#A8A8A8]"
              }`}
            >
              Kerja (25 Menit)
            </button>

            {/* BREAK */}
            <button
              onClick={() => {
                setMode("break");
                setTimeLeft(BREAK_TIME);
                setIsRunning(false);
              }}
              className={`px-4 py-2 rounded-full font-semibold w-full sm:w-[200px] h-[45px] transition ${
                mode === "break"
                  ? "bg-[#8AE847] text-white"
                  : "bg-gray-200 hover:bg-[#A8A8A8]"
              }`}
            >
              Istirahat (5 Menit)
            </button>
          </div>

          {/* TIMER */}
          <div className="relative flex justify-center items-center mb-8">
            <svg
              width={radius * 2 + 40}
              height={radius * 2 + 40}
              className="rotate-[-90deg]"
            >

              {/* BACKGROUND */}
              <circle
                cx={radius + 20}
                cy={radius + 20}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="14"
                fill="none"
              />

              {/* PROGRESS */}
              <circle
                cx={radius + 20}
                cy={radius + 20}
                r={radius}
                stroke={
                  mode === "work"
                    ? "#FF533D"
                    : "#8AE847"
                }
                strokeWidth="14"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* TIMER TEXT */}
            <div className="absolute text-center">
              <p className="font-bold text-4xl sm:text-6xl lg:text-7xl">
                {formatTime(timeLeft)}
              </p>
              <p className="text-gray-500 text-sm sm:text-lg">
                {
                  mode === "work"
                    ? "Waktu Kerja"
                    : "Waktu Istirahat"
                }
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            {/* START */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-3 text-white font-bold rounded-xl w-full sm:w-[160px] shadow transition ${
                mode === "work"
                  ? "bg-[#FF533D] hover:bg-[#C91414]"
                  : "bg-[#8AE847] hover:bg-[#26BA16]"
              }`}
            >
              {
                isRunning
                  ? "Pause"
                  : "Mulai"
              }
            </button>

            {/* RESET */}
            <button
              onClick={() => {

                setIsRunning(false);

                setTimeLeft(
                  mode === "work"
                    ? WORK_TIME
                    : BREAK_TIME
                );

              }}
              className="px-6 py-3 bg-gray-200 hover:bg-[#A8A8A8] rounded-xl w-full sm:w-[160px] shadow transition"
            >
              Reset
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6 w-full xl:w-[350px]">

          {/* STATISTIK */}
          <div className="bg-white p-6 rounded-2xl shadow text-center flex flex-col items-center justify-center min-h-[90px] md:min-h-[180px]">
            <h2 className="font-extrabold text-xl mb-2 md:text-2xl">
              Statistik Hari Ini
            </h2>
            <p className="text-2xl font-bold text-red-400 md:text-4xl">
              {sessions}
            </p>
            <p className="text-gray-500 text-sm md:text-md">
              Sesi Hari Ini
            </p>
          </div>

          {/* INFO */}
          <div className="bg-[#FFB4B440]/25 p-6 rounded-2xl shadow flex flex-col gap-6">
            <h2 className="font-extrabold text-xl text-center md:text-2xl">
              Cara Menggunakan
            </h2>
            <ol className="list-decimal ml-5 text-sm sm:text-base text-justify space-y-4">
              <li>
                Pilih mode kerja dan mulai timer.
              </li>
              <li>
                Fokus selama 25 menit.
              </li>
              <li>
                Istirahat 5 menit.
              </li>
              <li>
                Ulangi 4 kali lalu ambil istirahat panjang.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}