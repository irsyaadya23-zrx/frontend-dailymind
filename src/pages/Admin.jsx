import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";

const feedbackStatuses = [
  "Unread",
  "In Progress",
  "In Review",
  "Resolve",
];

const initialWords = [
  { id: 1, word: "kasar1" },
  { id: 2, word: "bodoh" },
];

export default function Admin() {

  // ================= USERS =================
  const [users, setUsers] = useState(() => {
    return JSON.parse(
      localStorage.getItem("admin_users")
    ) || [];
  });

  useEffect(() => {
  const syncUsers = () => {
    const updatedUsers =
      JSON.parse(localStorage.getItem("admin_users")) || [];

    setUsers(updatedUsers);
  };

  window.addEventListener("storage", syncUsers);

  return () =>
    window.removeEventListener("storage", syncUsers);
}, []);

useEffect(() => {

  const syncFeedback = () => {

    const updatedFeedback =
      JSON.parse(
        localStorage.getItem("admin_feedback")
      ) || [];

    setFeedback(updatedFeedback);
  };

  window.addEventListener(
    "storage",
    syncFeedback
  );

  return () =>
    window.removeEventListener(
      "storage",
      syncFeedback
    );

}, []);


  // ================= FEEDBACK =================
  const [feedback, setFeedback] = useState(() => {

  const stored =
    localStorage.getItem("admin_feedback");

  return stored
    ? JSON.parse(stored)
    : [];
});

  // ================= WORDS =================
  const [words, setWords] = useState(() => {
    const stored = localStorage.getItem("admin_words");

    if (!stored) {
      localStorage.setItem("admin_words", JSON.stringify(initialWords));
      return initialWords;
    }

    return JSON.parse(stored);
  });

  // ================= FORM =================
  const [search, setSearch] = useState("");
  const [newWord, setNewWord] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  // ================= SEARCH USER =================
  const handleSearchUser = () => {
    if (search.trim() === "") {
      setSearchedUser(null);
      return;
    }

    const foundUser = users.find((u) => u.id === search);
    setSearchedUser(foundUser || null);
  };

  // ================= TOGGLE STATUS =================
  const handleToggleStatus = () => {
    if (!searchedUser) return;

    const newStatus =
      searchedUser.status === "Banned"
        ? "Active"
        : "Banned";

    const updatedUsers = users.map((u) => {
      if (u.id === searchedUser.id) {
        return {
          ...u,
          status: newStatus,
        };
      }

      return u;
    });

    setUsers(updatedUsers);

    localStorage.setItem(
      "admin_users",
      JSON.stringify(updatedUsers)
    );

    setSearchedUser({
      ...searchedUser,
      status: newStatus,
    });
  };

    // ================= UPDATE FEEDBACK STATUS =================
  const handleFeedbackStatus = (id, newStatus) => {
    const updatedFeedback = feedback.map((item) => {
      if (item.id === id) {
      return {
        ...item,
        status: newStatus,
      };
    }
    return item;
  });
  setFeedback(updatedFeedback);

  localStorage.setItem(
    "admin_feedback",
    JSON.stringify(updatedFeedback)
  );
};

  // ================= ADD WORD =================
  const addWord = () => {
    if (!newWord.trim()) return;

    const newEntry = {
      id: Date.now(),
      word: newWord,
    };

    const updatedWords = [...words, newEntry];

    setWords(updatedWords);

    localStorage.setItem(
      "admin_words",
      JSON.stringify(updatedWords)
    );

    setNewWord("");
  };

  // ================= BADGE =================
  const statusBadge = (status) => {

  if (status === "Active")
    return "bg-green-500 text-white";

  if (status === "Banned")
    return "bg-red-500 text-white";

  if (status === "Unread")
    return "bg-red-500 text-white";

  if (status === "In Progress")
    return "bg-yellow-400 text-black";

  if (status === "In Review")
    return "bg-green-500 text-white";

  if (status === "Resolve")
    return "bg-blue-500 text-white";

  return "bg-gray-400 text-white";
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] font-['Sarabun'] pb-10">

      {/* ================= HEADER ================= */}
      <div className="border-b border-white px-5 py-8 md:px-8 md:py-10">

        <h1 className="
          text-[28px]
          md:text-[40px]
          text-[#27374D]
          font-bold
          font-['Coiny']
          leading-tight
        ">
          Welcome, Admin Daily Mind
        </h1>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="
        px-4
        md:px-8
        lg:px-16
        flex
        flex-col
        gap-6
        mt-6
      ">

        {/* ================= STAT CARD ================= */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4
          md:gap-6
        ">

          {[
            {
              label: "Total Pengguna",
              value: users.length,
            },
            {
              label: "Feedback Belum dibaca",
              value: feedback.filter(
                (f) => f.status === "Unread"
              ).length,
            },
            {
              label: "Total Jurnal Anonim",
              value: 0,
            },
          ].map((stat, i) => (

            <div
              key={i}
              className="
                h-[120px]
                md:h-[130px]
                bg-white/80
                rounded-2xl
                shadow-sm
                flex
                flex-col
                items-center
                justify-center
                border
                border-white
                px-4
                text-center
              "
            >

              <p className="text-gray-600 font-medium text-sm md:text-base">
                {stat.label}
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-[#27374D]">
                {stat.value}
              </h2>

            </div>

          ))}

        </div>

        {/* ================= USER MONITORING ================= */}
        <div className="bg-white rounded-3xl p-4 shadow-md border border-white overflow-hidden">

          <div className="
            bg-[#A1C4FD]
            text-center
            py-4
            font-bold
            text-sm
            md:text-base
            rounded-t-2xl
          ">
            User Monitoring
          </div>

          {/* MOBILE CARD */}
          <div className="md:hidden mt-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">

            {users.map((u) => (

              <div
                key={u.id}
                className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
              >

                <div className="space-y-2 text-sm">

                  <p>
                    <span className="font-bold">ID:</span> {u.id}
                  </p>

                  <p className="break-all">
                    <span className="font-bold">Email:</span> {u.email}
                  </p>

                  <p>
                    <span className="font-bold">Username:</span> {u.username}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">Status:</span>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusBadge(u.status)}`}>
                      {u.status}
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">

            <div className="bg-[#D1D5DB] px-6 py-3 flex text-sm font-bold text-gray-700">
              <span className="w-2/12 text-center">ID</span>
              <span className="w-4/12 text-center">Email</span>
              <span className="w-4/12 text-center">Username</span>
              <span className="w-2/12 text-center">Status</span>
            </div>

            <div className="max-h-[250px] overflow-y-auto px-6 pb-4">

              {users.map((u) => (

                <div
                  key={u.id}
                  className="flex items-center py-3 border-b border-gray-100 text-sm text-center"
                >

                  <span className="w-2/12">{u.id}</span>

                  <span className="w-4/12 truncate px-2">
                    {u.email}
                  </span>

                  <span className="w-4/12">
                    {u.username}
                  </span>

                  <span className="w-2/12 flex justify-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${statusBadge(u.status)}`}>
                      {u.status}
                    </span>
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="bg-[#E5E7EB] rounded-3xl p-3 shadow-md border border-white overflow-hidden">

          <div className="
            bg-[#D8B4FE]
            text-center
            py-4
            font-bold
            rounded-t-2xl
          ">
            Laporan Feedback Pengguna
          </div>

          {/* MOBILE */}
          <div className="md:hidden mt-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">

            {feedback.map((f) => (

              <div
                key={f.id}
                className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
              >

                <div className="space-y-2 text-sm">

                  <p>
                    <span className="font-bold">ID:</span> {f.id}
                  </p>

                  <p>
                    <span className="font-bold">Kategori:</span> {f.kategori}
                  </p>

                  <p>
                    <span className="font-bold">Pesan:</span> "{f.pesan}"
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">Status:</span>

                  <select
                    value={f.status}
                    onChange={(e) =>
                      handleFeedbackStatus( f.id, e.target.value)
                    }
                    className={`px-3, py-1, rounded-full, text-[10px], font-bold, outline-none, ${statusBadge(f.status)}
                    `}
                  >
                  
                  {feedbackStatuses.map((status) => (
                    <option
                    key={status}
                    value={status}
                    >
                      {status}
                    </option>
                   ))}
                  </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block">

            <div className="  bg-[#D1D5DB] px-6 py-3 flex text-sm font-bold text-gray-700">
              <span className="w-2/12 text-center">Id Feed</span>
              <span className="w-3/12 text-center">Kategori</span>
              <span className="w-5/12 text-center">Isi Pesan</span>
              <span className="w-2/12 text-center">Status</span>
            </div>

            <div className="max-h-[250px] overflow-y-auto px-6 pb-4">

              {feedback.map((f) => (

                <div
                  key={f.id}
                  className="flex items-center py-3 border-b border-gray-100 text-sm text-center"
                >

                  <span className="w-2/12">{f.id}</span>

                  <span className="w-3/12">{f.kategori}</span>

                  <span className="w-5/12 text-left px-4 italic">
                    "{f.pesan}"
                  </span>

                  <span className="w-2/12 flex justify-center">
                    <select
                    value={f.status}
                    onChange={(e) =>
                      handleFeedbackStatus( f.id, e.target.value)}
                    className={`px-3, py-1, rounded-full, text-[10px], font-bold, outline-none, cursor-pointer, ${statusBadge(f.status)}
                    `}
                    >
                      
                      {feedbackStatuses.map((status) => (
                        <option
                        key={status}
                        value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SENSOR KATA ================= */}
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 border border-white">

          <div className="
            bg-[#B4D9FC]
            text-center
            py-2
            rounded-lg
            font-bold
            mb-4
          ">
            Sensor Kata
          </div>

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
            mb-6
          ">

            <input
              type="text"
              placeholder="Tulis Kata"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:border-blue-400
              "
            />

            <button
              onClick={addWord}
              className="
                bg-[#B4D9FC]
                px-6
                py-3
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                hover:bg-blue-300
                transition-colors
              "
            >
              <Plus size={20} strokeWidth={3} />
              Tambah
            </button>

          </div>

          <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">

            {words.map((w) => (

              <span
                key={w.id}
                className="
                  bg-red-400
                  text-white
                  px-4
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                "
              >
                {w.word}
              </span>

            ))}

          </div>

        </div>

        {/* ================= SEARCH USER ================= */}
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 border border-white">

          <div className="
            bg-[#C2E9FB]
            text-center
            py-2
            rounded-lg
            font-bold
            mb-4
          ">
            Active / Banned
          </div>

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
          ">

            <input
              type="text"
              placeholder="Masukan User Id (contoh: 0001)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:border-blue-400
              "
            />

            <button
              onClick={handleSearchUser}
              className="
                bg-[#CDF4FF]
                px-6
                py-3
                rounded-xl
                hover:bg-blue-200
                flex
                items-center
                justify-center
                gap-2
                transition-colors
              "
            >
              <Search size={18} strokeWidth={2.5} />
              Search
            </button>

          </div>

          {/* HASIL */}
          {searchedUser && (

            <div className="
              mt-6
              p-4
              border
              border-gray-200
              bg-gray-50
              rounded-2xl
              flex
              flex-col
              md:flex-row
              gap-4
              md:items-center
              md:justify-between
            ">

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Hasil Pencarian:
                </p>

                <p className="text-lg font-bold text-[#27374D]">
                  ID: {searchedUser.id}
                </p>

                <p className="text-sm text-gray-600">
                  {searchedUser.username}
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="text-sm">
                    Status:
                  </span>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusBadge(searchedUser.status)}`}>
                    {searchedUser.status}
                  </span>

                </div>

              </div>

              <button
                onClick={handleToggleStatus}
                className={`
                  px-6
                  py-3
                  rounded-xl
                  text-white
                  font-bold
                  transition-colors
                  shadow-sm
                  w-full
                  md:w-auto
                  ${
                    searchedUser.status === "Banned"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
              >

                {searchedUser.status === "Banned"
                  ? "Unban User"
                  : "Ban User"}

              </button>

            </div>

          )}

          {/* NOT FOUND */}
          {search !== "" && !searchedUser && (

            <div className="mt-4 text-center text-sm text-red-500 font-medium">

              *User dengan ID tersebut tidak ditemukan.

            </div>

          )}

        </div>

      </div>

    </div>
  );
}