import { useState, useEffect } from "react";

export default function Admin() {
  const API = "http://localhost:3000";

  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState("");

  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState("");

  // ================= FETCH =================
  const fetchUsers = async () => {
    const res = await fetch(
      `${API}/users${search ? `?id=${search}` : ""}`
    );
    const data = await res.json();
    setUsers(data);
  };

  const fetchFeedback = async () => {
    const res = await fetch(`${API}/feedback`);
    const data = await res.json();
    setFeedback(data);
  };

  const fetchWords = async () => {
    const res = await fetch(`${API}/banned-words`);
    const data = await res.json();
    setWords(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  useEffect(() => {
    fetchFeedback();
    fetchWords();
  }, []);

  // ================= ACTION =================
  const handleBan = async (user) => {
    const newStatus = user.status === "Banned" ? "Active" : "Banned";

    await fetch(`${API}/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchUsers();
  };

  const addWord = async () => {
    if (!newWord.trim()) return;

    await fetch(`${API}/banned-words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: newWord }),
    });

    setNewWord("");
    fetchWords();
  };

  // ================= BADGE =================
  const statusBadge = (status) => {
    if (status === "Active") return "bg-green-500 text-white";
    if (status === "Banned") return "bg-red-500 text-white";
    if (status === "Unread") return "bg-orange-400 text-white";
    if (status === "Resolve") return "bg-green-600 text-white";
    return "bg-yellow-400 text-black";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">

      {/* HEADER */}
      <div className="h-[167px] p-8 flex items-center border-b-[1px] border-white bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">
        <h1 className="text-[40px] text-[#27374D]-400 font-['Coiny']">Welcome, Admin Daily Mind</h1>
      </div>

      <div className="mx-16 my-8 flex flex-col gap-8">

        {/* STAT */}
        <div className="w-full flex justify-between gap-16">
          <div className="h-[133px] w-full bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-xl">Total Pengguna</p>
            <h2 className="text-2xl font-bold">{users.length}</h2>
          </div>

          <div className="h-[133px] w-full bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-xl">Feedback Belum Dibaca</p>
            <h2 className="text-2xl font-bold">
              {feedback.filter(f => f.status === "Unread").length}
            </h2>
          </div>

          <div className="h-[133px] w-full bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center">
            <p className="text-xl">Total Jurnal Anonim</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>

        {/* ================= USER MONITORING ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="bg-blue-200 text-center py-3 font-bold">
            <h1 className="text-lg font-bold">User Monitoring</h1>
          </div>

          <div className="bg-gray-100 pt-0 pb-4 max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm text-center border-collapse">
              
              <thead className="bg-[#DBDBDB] sticky top-0 z-10">
                <tr className="border-b border-gray-400">
                  <th className="py-2 px-3 text-md">ID</th>
                  <th className="px-3 text-md">Email</th>
                  <th className="px-3 text-md">Username</th>
                  <th className="px-3 text-md">Status</th>
                  <th className="px-3 text-md">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2 px-3">{u.id}</td>
                    <td className="px-3">{u.email}</td>
                    <td className="px-3">{u.username}</td>
                    <td className="px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusBadge(u.status)}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-3">
                      <button
                        onClick={() => handleBan(u)}
                        className={`px-2 py-1 rounded text-white ${
                          u.status === "Banned"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {u.status === "Banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="bg-purple-200 text-center py-3">
            <h1 className="text-lg font-bold">Laporan Feedback Pengguna</h1>
          </div>

          <div className="bg-gray-100 pt-0 pb-4 max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm text-center border-collapse">
              
              <thead className="bg-[#DBDBDB] sticky top-0 z-10">
                <tr className="border-b border-gray-400">
                  <th className="py-2 px-3 text-md">ID</th>
                  <th className="px-3 text-md">Kategori</th>
                  <th className="px-3 text-md">Pesan</th>
                  <th className="px-3 text-md">Status</th>
                </tr>
              </thead>

              <tbody>
                {feedback.map((f) => (
                  <tr key={f.id} className="border-b">
                    <td className="py-2 px-3">{f.id}</td>
                    <td className="px-3">{f.kategori}</td>
                    <td className="px-3">{f.pesan}</td>
                    <td className="px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusBadge(f.status)}`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* ================= SENSOR KATA ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="bg-blue-200 text-center py-3 font-bold">
            <h1 className="text-lg font-bold">Sensor Kata</h1>
          </div>

          <div className="bg-gray-100 p-4 flex gap-3">
            <input
              type="text"
              placeholder="Tulis Kata"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border"
            />
            <button
              onClick={addWord}
              className="bg-blue-500 text-white px-4 rounded-xl"
            >
              + Tambah
            </button>
          </div>

          <div className="bg-gray-100 px-4 pb-4 flex flex-wrap gap-2">
            {words.map((w) => (
              <span key={w.id} className="bg-red-400 text-white px-3 py-1 rounded-full text-sm">
                {w.word}
              </span>
            ))}
          </div>
        </div>

        {/* ================= SEARCH USER ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="bg-blue-200 text-center py-3 font-bold">
            <h1 className="text-lg font-bold">Active/Banned</h1>
          </div>

          <div className="bg-gray-100 p-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Masukan User Id"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border"
              />
              <button
                onClick={fetchUsers}
                className="bg-blue-500 text-white px-4 rounded-xl"
              >
                Search
              </button>
            </div>

            {users.map((u) => (
              <div key={u.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
                <div>
                  <p className="font-semibold">{u.username}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>

                <button
                  onClick={() => handleBan(u)}
                  className={`px-3 py-1 rounded text-white ${
                    u.status === "Banned"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {u.status === "Banned" ? "Unban" : "Ban"}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}