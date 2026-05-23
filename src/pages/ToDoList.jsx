import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToDoList() {

  // API URL

  const API_URL_TODO = import.meta.env.API_URL_TODO;

  // STATE

  const [isFocused, setIsFocused] =
    useState(false);

  const [todos, setTodos] = useState([]);

  const [completedCount, setCompletedCount] =
    useState(0);

  const [inputValue, setInputValue] =
    useState("");

  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] =
    useState(true);

  // GET TODOS
 
  useEffect(() => {

    const getTodos = async () => {

      try {

        const response = await fetch(
          API_URL_TODO,
          {
            method: "GET",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil todo"
          );
        }

        const data = await response.json();

        const todosData =
          data.todos ||
          data.data || 
          [];

        // ACTIVE TODO
        const activeTodos =
          todosData.filter(
            (todo) => !todo.completed
          );

        // COMPLETE TODO
        const completedTodos =
          todosData.filter(
            (todo) => todo.completed
          );

        setTodos(activeTodos);

        setCompletedCount(
          completedTodos.length
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    getTodos();

  }, []);

  // ADD TODO

  const handleAddTodo = async () => {

    if (
      inputValue.trim() === "" ||
      !deadline
    ) {
      return;
    }

    try {

      const response = await fetch(
        API_URL_TODO,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            task: inputValue,
            date: deadline,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal menambahkan todo"
        );
      }

      const data = await response.json();

      const newTodo =
        data.todo ||
        data.data;

      setTodos((prev) =>
        [...prev, newTodo].sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        )
      );

      setInputValue("");

    } catch (err) {

      console.error(err);
    }
  };

  // COMPLETE TODO
 
  const handleCheck = async (id) => {

    // ANIMASI CHECK
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              isChecking: true,
            }
          : todo
      )
    );

    setTimeout(async () => {

      try {

        const response = await fetch(
          `${API_URL_TODO}/${id}`,
          {
            method: "PATCH",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              completed: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Gagal update todo"
          );
        }

        // HAPUS DARI ACTIVE
        setTodos((prev) =>
          prev.filter(
            (todo) => todo._id !== id
          )
        );

        // TAMBAH COMPLETE
        setCompletedCount(
          (prev) => prev + 1
        );

      } catch (err) {

        console.error(err);
      }

    }, 600);
  };

  // TOTAL & PROGRESS

  const totalTugas =
    todos.length + completedCount;

  const progressPercent =
    totalTugas === 0
      ? 0
      : Math.round(
          (completedCount /
            totalTugas) *
            100
        );

  // LOADING SCREEN

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
    <div className="w-full px-4 py-2 sm:p-6 md:p-8 lg:p-10">

      <div className="flex flex-col min-h-screen gap-8 w-full">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <h1 className="font-bold text-3xl md:text-4xl">
            To-Do-List
          </h1>

          <p className="text-gray-700 font-semibold">
            Kelola tugasmu berdasarkan
            deadline.
          </p>

        </motion.header>

        {/* STATS */}
        <div className="flex justify-between gap-6 items-center h-20 md:h-40">

          {/* TOTAL */}
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-md md:text-xl font-bold">
              Total
            </h2>
            <h2 className="text-md md:text-xl font-semibold">
              {totalTugas}
            </h2>
          </div>

          {/* ACTIVE */}
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-md md:text-xl font-bold">
              Aktif
            </h2>
            <h2 className="text-md md:text-xl font-semibold text-[#0059FF]">
              {todos.length}
            </h2>
          </div>

          {/* COMPLETE */}
          <div className="flex flex-col justify-center items-center bg-white rounded-xl w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-md md:text-xl font-bold">
              Selesai
            </h2>
            <h2 className="text-md md:text-xl font-semibold text-[#00FF00]">
              {completedCount}
            </h2>
          </div>
        </div>

        {/* INPUT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap md:flex-nowrap gap-3 border border-gray-100">

          {/* INPUT TEXT */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(
                e.target.value
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleAddTodo()
            }
            onFocus={() =>
              setIsFocused(true)
            }
            onBlur={() =>
              setIsFocused(false)
            }
            className="w-full peer flex-grow p-3 rounded-xl outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC] md:w-auto"
            placeholder="Ketik tugas baru..."
          />

          {/* DEADLINE */}
          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(
                e.target.value
              )
            }
            onFocus={() =>
              setIsFocused(true)
            }
            onBlur={() =>
              setIsFocused(false)
            }
            className="w-full peer p-3 rounded-xl bg-white outline-2 outline-[#000000]/30 cursor-pointer md:w-auto"
          />

          {/* BUTTON */}
          <button
            onClick={handleAddTodo}
            className={`w-full px-6 py-3 rounded-xl font-bold text-white transition-all md:w-auto ${
              isFocused
                ? "bg-[#09EB00CC]"
                : "bg-[#ABE3A9]"
            }`}
          >
            Tambah
          </button>

        </div>

        {/* TODO CONTENT */}
        <AnimatePresence mode="popLayout">

          {todos.length > 0 && (

            <motion.div
              key="todo-content"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="space-y-6"
            >

              {/* PROGRESS */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">

                <div className="flex justify-between mb-4 font-bold text-gray-700">

                  <span>
                    Progress Hari Ini
                  </span>

                  <span className="text-[#09EB00CC]">
                    {progressPercent}%
                  </span>

                </div>

                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${progressPercent}%`,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="h-full bg-[#09EB00CC]"
                  />

                </div>
              </div>

              {/* ACTIVE TASK */}
              <div className="w-full bg-white rounded-2xl p-6 flex flex-col gap-2">

                <label className="text-[18px] font-medium-500 md:text-[20px]">
                  Tugas Aktif
                </label>

                <div className="space-y-4">

                  {todos.map((todo) => (

                    <TaskBox
                      key={todo._id}
                      todo={todo}
                      onCheck={() =>
                        handleCheck(
                          todo._id
                        )
                      }
                    />
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

// TASK BOX

function TaskBox({ todo, onCheck }) {

  // PRIORITY
  const getPriorityStyle = (
    targetDate
  ) => {

    const diff =
      new Date(targetDate) -
      new Date().setHours(
        0,
        0,
        0,
        0
      );

    const days =
      diff / (1000 * 60 * 60 * 24);

    if (days <= 2)
      return {
        color:
          "bg-[#FFE5E5] border-[#FF9999]",
        label: "Mendesak",
      };

    if (days <= 4)
      return {
        color:
          "bg-[#FFF9E5] border-[#FFE082]",
        label: "Dekat",
      };

    return {
      color:
        "bg-[#E5FFE7] border-[#99FFAB]",
      label: "Aman",
    };
  };

  const status = getPriorityStyle(
    todo.date
  );

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: 20,
      }}
      className={`flex items-center p-5 rounded-2xl border-2 shadow-xl ${status.color}`}
    >

      {/* CHECKBOX */}
      <input
        type="checkbox"
        className="w-6 h-6 mr-4 accent-[#09EB00CC] cursor-pointer"
        onChange={onCheck}
      />

      {/* CONTENT */}
      <div className="flex flex-col gap-2 flex-grow">

        <span
          className={`font-semibold text-md md:text-lg ${
            todo.isChecking
              ? "line-through text-gray-400 italic"
              : "text-gray-800"
          }`}
        >
          {todo.task}
        </span>

        <span
          className={`text-xs text-gray-500 text-center font-medium px-3 py-1 rounded-2xl w-[180px] border-2 border ${status.color.split(" ")[1]}`}
        >
          Deadline: {todo.date}
        </span>

      </div>

      {/* PRIORITY */}
      <span
        className={`w-[100px] text-[10px] text-center font-bold uppercase px-3 py-1 rounded-2xl border-2 border ${status.color.split(" ")[1]}`}
      >
        {status.label}
      </span>

    </motion.div>
  );
}