import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBannedWords } from "../AdminService";

const Home = () => {
  
  const API_URL_TODO = import.meta.env.VITE_API_URL_TODO;
  const API_URL_JOURNAL = import.meta.env.VITE_API_URL_JOURNAL;
  const API_URL_MOOD = import.meta.env.VITE_API_URL_MOOD;

  const [todos, setTodos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [moodStreak, setMoodStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const [journalInput, setJournalInput] = useState("");

  const [words, setWords] =
    useState([]);

  const navigate = useNavigate();

  // HANDLE JOURNAL
  const handleAddJournal = () => {
    navigate("/Journal", {
      state: {
        draft: journalInput,
      },
    });
  };

  // BANNED WORDS
    useEffect(() => {
  
    const fetchWords =
      async () => {
  
        try {
  
          const data =
            await getBannedWords();
  
          console.log(
            "BANNED WORDS:",
            data
          );
  
          const wordsArray =
            Array.isArray(data)
              ? data
              : Array.isArray(data?.words)
              ? data.words
              : Array.isArray(data?.data)
              ? data.data
              : [];
  
          setWords(
            wordsArray.length > 0
              ? wordsArray
              : [
                  { word: "bego" },
                  { word: "tolol" }
                ] 
          );
  
        } catch (error) {
  
          console.error(error);
        }
      };
  
    fetchWords();
  
  }, []);
  
      useEffect(() => {
        console.log("WORDS:", words);
      }, [words]);

  //FETCH DATA
const fetchHomeData = async () => {
  try {

    const [
      todoRes,
      journalRes,
      moodRes,
    ] = await Promise.all([
      fetch(API_URL_TODO, {
        credentials: "include",
      }),

      fetch(API_URL_JOURNAL, {
        credentials: "include",
      }),

      fetch(API_URL_MOOD, {
        credentials: "include",
      }),
    ]);

    // ====================
    // TODO
    // ====================

    const todoData = await todoRes.json();

    const todos =
      todoData.todos ||
      todoData.data ||
      [];

    // hanya todo aktif
    const activeTodos =
      todos.filter(
        (todo) => !todo.completed
      );

    setTodos(activeTodos);

    // ====================
    // JOURNAL
    // ====================

    const journalData =
      await journalRes.json();

    const journals =
      journalData.journals ||
      journalData.data ||
      [];

    setJournals(journals);

    // ====================
    // MOOD
    // ====================

    const moodData =
      await moodRes.json();

    const moods =
      moodData.moods ||
      moodData.data ||
      [];

    // ====================
    // HITUNG STREAK
    // ====================

const sortedMoods = [...moods].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

if (sortedMoods.length === 0) {
  setMoodStreak(0);
  return;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const lastMoodDate = new Date(sortedMoods[0].createdAt);
lastMoodDate.setHours(0, 0, 0, 0);

const diffDays = (today - lastMoodDate) / (1000 * 60 * 60 * 24);

// Kalau mood terakhir lebih dari 1 hari lalu → streak reset
if (diffDays > 1) {
  setMoodStreak(0);
  return;
}

// Hitung streak dari mood terbaru
let streak = 0;
let compareDate = new Date(lastMoodDate);

for (let i = 0; i < sortedMoods.length; i++) {
  const moodDate = new Date(sortedMoods[i].createdAt);
  moodDate.setHours(0, 0, 0, 0);

  const target = compareDate.toISOString().split("T")[0];
  const current = moodDate.toISOString().split("T")[0];

  if (current === target) {
    streak++;
    // Mundur 1 hari untuk cek mood berikutnya
    compareDate.setDate(compareDate.getDate() - 1);
  } else if (current < target) {
    // Ada hari yang bolong → streak berhenti
    break;
  }
  // Kalau ada duplikat mood di hari yang sama → skip
}

setMoodStreak(streak);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

useEffect(() => {

  fetchHomeData();

  const handleUpdate = () => {
    fetchHomeData();
  }

  window.addEventListener(
    "dataUpdated",
    handleUpdate
  );

  return () => {
    window.removeEventListener(
      "dataUpdated",
      handleUpdate
    );
  };
}, []);

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

  //FUNCTION SENSOR KATA
  const censorText = (text) => {

  let result = text;

  words.forEach((w) => {

    const badWord =
      w.word || w;

    if (!badWord) return;

    result =
      result.replace(
        new RegExp(
          badWord,
          "gi"
        ),
        "*".repeat(
          badWord.length
        )
      );
  });

  return result;
};

return (
    <div className="min-h-screen font-inter flex flex-col bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] overflow-hidden">

      {/* AREA UTAMA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 border-b-2 border-white/90 pb-6 px-4 sm:px-6 lg:px-10 pt-4">

          {/* KIRI */}
          <div className="flex-1">

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] text-[#1F2A44] font-['Poppins'] font-bold leading-tight">
              How Is Your Mood Today?
            </h1>

            {/* INPUT */}
            <div className="flex items-center mt-4 w-full">

            <input
              type="text"
              placeholder="Tulis Disini"
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddJournal();
                }
              }}
              className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 py-3 px-5 sm:px-8 rounded-full shadow-sm focus:outline-none text-[#1F2A44] font-medium text-sm sm:text-base"
            />

            <button
              onClick={handleAddJournal}
              className="ml-3 min-w-[42px] h-[42px] flex items-center justify-center border-2 border-[#1F2A44] rounded-full text-[#1F2A44] font-bold hover:bg-[#1F2A44] hover:text-white transition duration-300"
            >
                +
            </button>
            </div>
          </div>

          {/* MOOD STREAK */}
          <div className="w-full xl:w-64 flex justify-center xl:justify-end">

            <div className="bg-[#1F2A44] w-full max-w-[280px] p-6 rounded-[30px] text-white flex flex-col items-center shadow-xl transition hover:scale-105">

              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-5xl font-black font-manrope">
                  {moodStreak}
                </span>

                <span className="text-2xl md:text-5xl">🔥</span>
              </div>

              <p className="text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase mt-1">
                Mood Streak
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 flex-1 px-4 sm:px-6 lg:px-10 py-6 overflow-hidden">

          {/* KOLOM JURNAL */}
          <div
            className="
              flex-1
              overflow-y-auto
              custom-scrollbar
              space-y-6
              max-h-[50vh]
              md:max-h-[75vh]
              pr-2
            "
          >

            {journals.length === 0 ? (
              <div className="bg-white/90 p-6 sm:p-8 rounded-[25px] sm:rounded-[35px] shadow-sm border border-white/20">

                <p className="text-gray-400 text-center">
                  Belum ada jurnal
                </p>

              </div>
            ) : (
              journals.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/90 p-6 sm:p-8 rounded-[25px] sm:rounded-[35px] shadow-sm border border-white/20 transition-all duration-300 hover:shadow-lg"
                >

                  <p className="text-[#1F2A44]/60 text-sm mb-2">
                    {item.date}
                  </p>

                  <p className="text-[#1F2A44]/80 leading-relaxed text-sm sm:text-[15px] font-medium break-words">
                    {censorText(item.content)}
                  </p>

                </div>
              ))
            )}
          </div>

          {/* SIDE */}
          <div className="w-full xl:w-64 flex-shrink-0 flex flex-col gap-6">

            {/* DAILY MISSION */}
            <div className="bg-white/40 backdrop-blur-md p-5 sm:p-7 rounded-[20px] border border-white/40 shadow-sm">

              <h3 className="font-bold text-[#1F2A44] mb-4 text-center font-manrope text-lg">
                Daily Mission
              </h3>

              <div className="space-y-3">

                <div className="bg-white/70 p-3 rounded-2xl text-xs sm:text-sm text-center border border-white/20 shadow-sm font-semibold">
                  Ajak Kenalan 1 Orang baru di kampus
                </div>

                <div className="bg-white/70 p-3 rounded-2xl text-xs sm:text-sm text-center border border-white/20 shadow-sm font-semibold">
                  Push Up 10 x
                </div>

                <div className="bg-white/70 p-3 rounded-2xl text-xs sm:text-sm text-center border border-white/20 shadow-sm font-semibold">
                  Jangan Buka Medsos 2 Jam
                </div>

              </div>
            </div>

            {/* TODO */}
            <div className="bg-white p-5 sm:p-7 rounded-[30px] sm:rounded-[40px] shadow-sm flex flex-col border border-blue-50/50 max-h-[150px] md:max-h-[300px] h-[300px]">

              <h3 className="font-bold text-[#1F2A44] text-center mb-4 font-manrope text-lg">
                To-Do List
              </h3>

              <ul
                className={`
                  flex-1
                  overflow-y-auto
                  custom-scrollbar
                  text-sm
                  font-inter
                  font-medium
                  leading-relaxed
                  pr-2
                  ${
                    todos.length === 0
                      ? ""
                      : "list-disc pl-5 text-[#1F2A44]/80"
                  }
                `}
              >

                {todos.length === 0 ? (
                  <li className="text-center text-gray-400 text-sm list-none">
                    Belum ada todo
                  </li>
                ) : (
                  todos.map((todo) => (
                    <li
                      key={todo._id}
                      className="mb-2 break-words"
                    >
                      {todo.task}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM SCROLLBAR */}
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