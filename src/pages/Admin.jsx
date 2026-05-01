import { useState } from "react";
import { Plus, Search } from "lucide-react";

// Data Dummy
const initialUsers = [
  { id: "0001", email: "296318327@gmail.com", username: "Lorem Sit dolar", status: "Active" },
  { id: "0002", email: "1323418332@gmail.com", username: "Lorem Sit dolar", status: "Banned" },
  { id: "0003", email: "8189619919@gmail.com", username: "Lorem Sit dolar", status: "Banned" },
  { id: "0004", email: "user_empat@gmail.com", username: "User Empat", status: "Active" },
];

const initialFeedback = [
  { id: "F001", kategori: "Bug", pesan: "Aplikasi sering keluar sendiri", status: "Unread" },
  { id: "F002", kategori: "Saran", pesan: "Tambahkan fitur dark mode", status: "Resolve" },
];

const initialWords = [
  { id: 1, word: "kasar1" },
  { id: 2, word: "bodoh" },
];

export default function Admin() {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("admin_users");
    if (!stored) {
      localStorage.setItem("admin_users", JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(stored);
  });

  // eslint-disable-next-line no-unused-vars
  const [feedback, setFeedback] = useState(() => {
    const stored = localStorage.getItem("admin_feedback");
    if (!stored) {
      localStorage.setItem("admin_feedback", JSON.stringify(initialFeedback));
      return initialFeedback;
    }
    return JSON.parse(stored);
  });

  const [words, setWords] = useState(() => {
    const stored = localStorage.getItem("admin_words");
    if (!stored) {
      localStorage.setItem("admin_words", JSON.stringify(initialWords));
      return initialWords;
    }
    return JSON.parse(stored);
  });

  // input form
  const [search, setSearch] = useState("");
  const [newWord, setNewWord] = useState("");
  
  // Tampung pencarian user
  const [searchedUser, setSearchedUser] = useState(null);

  // ================= ACTION: SEARCH USER =================
  const handleSearchUser = () => {
    if (search.trim() === "") {
      setSearchedUser(null);
      return;
    }
    const foundUser = users.find((u) => u.id === search);
    setSearchedUser(foundUser || null);
  };

  // Toggle Ban/Active
  const handleToggleStatus = () => {
    if (!searchedUser) return;

    const newStatus = searchedUser.status === "Banned" ? "Active" : "Banned";
    
    // Update data user
    const updatedUsers = users.map((u) => {
      if (u.id === searchedUser.id) {
        return { ...u, status: newStatus };
      }
      return u;
    });

    // Simpan ke local storage
    setUsers(updatedUsers);
    localStorage.setItem("admin_users", JSON.stringify(updatedUsers));
    
    // 3. Update tampilan kartu hasil pencarian di bawah
    setSearchedUser({ ...searchedUser, status: newStatus });
  };

  // Ban word
  const addWord = () => {
    if (!newWord.trim()) return;
    
    const newEntry = { id: Date.now(), word: newWord };
    const updatedWords = [...words, newEntry];
    
    setWords(updatedWords);
    localStorage.setItem("admin_words", JSON.stringify(updatedWords));
    setNewWord(""); // Reset form
  };

  // label status
  const statusBadge = (status) => {
    if (status === "Active") return "bg-green-500 text-white";
    if (status === "Banned") return "bg-red-500 text-white";
    if (status === "Unread") return "bg-orange-400 text-white";
    if (status === "Resolve") return "bg-green-600 text-white";
    return "bg-gray-400 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] font-['Sarabun'] pb-10">
      
      {/* HEADER */}
      <div className="h-[169px] bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] mb-6 border-b-1 border-white p-8 flex items-center">
        <h1 className="text-[40px] text-[#27374D] font-bold font-['Coiny']">
          Welcome, Admin Daily Mind
        </h1>
      </div>

      <div className="mx-16 flex flex-col gap-6">
        
        {/* ================= STAT CARDS ================= */}
        <div className="flex gap-6">
          {[
            { label: "Total Pengguna", value: users.length },
            { label: "Feedback Belum dibaca", value: feedback.filter(f => f.status === "Unread").length },
            { label: "Total Jurnal Anonim", value: 0 }
          ].map((stat, i) => (
            <div key={i} className="flex-1 h-[130px] bg-white/80 rounded-2xl shadow-sm flex flex-col items-center justify-center border border-white">
              <p className="text-gray-600 font-medium mb-1">{stat.label}</p>
              <h2 className="text-3xl font-bold text-[#27374D]">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* ================= USER MONITORING ================= */}
        <div className="bg-white rounded-3xl px-4 shadow-md border border-white overflow-hidden">
          <div className="bg-[#A1C4FD] text-black-700 text-center mt-3 py-3 font-bold rounded-tr-2xl rounded-tl-2xl">
            User Monitoring
          </div>

          {/* Header Tabel - Lebar kolom disesuaikan karena Aksi dihapus */}
          <div className="bg-[#E5E7EB] px-6 py-2 flex text-sm font-bold text-gray-700">
            <span className="w-2/12 text-center">ID</span>
            <span className="w-4/12 text-center">Email</span>
            <span className="w-4/12 text-center">Username</span>
            <span className="w-2/12 text-center">Status</span>
          </div>

          <div className="max-h-[250px] overflow-y-auto px-6 pb-4">
            {users.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">Tidak ada data ditemukan</div>
            ) : (
              users.map((u) => (
                <div key={u.id} className="flex items-center py-3 border-b border-gray-100 text-sm text-center">
                  <span className="w-2/12">{u.id}</span>
                  <span className="w-4/12 truncate px-2">{u.email}</span>
                  <span className="w-4/12">{u.username}</span>
                  <span className="w-2/12 flex justify-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${statusBadge(u.status)}`}>
                      {u.status}
                    </span>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="bg-white rounded-3xl px-4 shadow-md border border-white overflow-hidden">
          <div className="bg-[#E0C3FC] text-black-700 text-center mt-3 py-3 font-bold rounded-tr-2xl rounded-tl-2xl">
            Laporan Feedback Pengguna
          </div>

          <div className="bg-[#E5E7EB] px-6 py-2 flex text-sm font-bold text-gray-700">
            <span className="w-2/12 text-center">Id Feed</span>
            <span className="w-3/12 text-center">Kategori</span>
            <span className="w-5/12 text-center">Isi Pesan</span>
            <span className="w-2/12 text-center">Status</span>
          </div>

          <div className="max-h-[250px] overflow-y-auto px-6 pb-4">
            {feedback.map((f) => (
              <div key={f.id} className="flex items-center py-3 border-b border-gray-100 text-sm text-center">
                <span className="w-2/12">{f.id}</span>
                <span className="w-3/12">{f.kategori}</span>
                <span className="w-5/12 text-left px-4 italic">"{f.pesan}"</span>
                <span className="w-2/12 flex justify-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${statusBadge(f.status)}`}>
                    {f.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SENSOR KATA ================= */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-white">
          <div className="bg-[#B4D9FC] text-black-700 text-center py-2 rounded-lg font-bold mb-4">
            Sensor Kata
          </div>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Tulis Kata"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-400 transition-all"
            />
            <button
              onClick={addWord}
              className="bg-[#B4D9FC] text-black-600 px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-300 transition-colors"
            >
              <Plus className="text-black" size={20} strokeWidth={3} /> Tambah
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((w) => (
              <span key={w.id} className="bg-red-400 text-white px-4 py-1 rounded-full text-xs font-medium">
                {w.word}
              </span>
            ))}
          </div>
        </div>

        {/* ================= SEARCH / ACTION ================= */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-white">
          <div className="bg-[#C2E9FB] text-black-700 text-center py-2 rounded-lg font-bold mb-4">
            Active / Banned
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Masukan User Id (contoh: 0001)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-blue-400 transition-all"
            />
            <button
              onClick={handleSearchUser}
              className="bg-[#CDF4FF] text-black-600 px-8 py-2 rounded-xl hover:bg-blue-200 flex items-center gap-2 transition-colors"
            >
              <Search className="text-black" size={18} strokeWidth={2.5} /> Search
            </button>
          </div>

          {/* Cari User */}
          {searchedUser && (
            <div className="mt-6 p-4 border border-gray-200 bg-gray-50 rounded-2xl flex justify-between items-center transition-all">
              <div>
                <p className="text-sm text-gray-500 font-medium">Hasil Pencarian:</p>
                <p className="text-lg font-bold text-[#27374D]">
                  ID: {searchedUser.id} <span className="text-sm font-normal text-gray-600">({searchedUser.username})</span>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm">Status Saat Ini: </span>
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${statusBadge(searchedUser.status)}`}>
                    {searchedUser.status}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleToggleStatus}
                className={`px-6 py-2 rounded-xl text-white font-bold transition-colors shadow-sm ${
                  searchedUser.status === "Banned" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {searchedUser.status === "Banned" ? "Unban User" : "Ban User"}
              </button>
            </div>
          )}
          
          {/* Kalo user tidak ditemukan */}
          {search !== "" && !searchedUser && (
            <div className="mt-4 text-center text-sm text-red-500 font-medium">
              *User dengan ID tersebut tidak ditemukan. (Coba ketik "0001" atau "0002")
            </div>
          )}
        </div>

      </div>
    </div>
  );
}