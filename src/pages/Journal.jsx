import { useState, useEffect } from "react";

export default function Journal() {

  // =========================================
  // API
  // =========================================
  const API_URL = "http://localhost:5000/api/journal";

  // =========================================
  // TOKEN LOGIN
  // =========================================
  const token = localStorage.getItem("token");

  // =========================================
  // STATE
  // =========================================
  const [entries, setEntries] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================================
  // GET JOURNAL DARI DATABASE
  // =========================================
  useEffect(() => {
    const getJournals = async () => {
      try {

        const response = await fetch(`${API_URL}`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil jurnal");
        }

        const data = await response.json();

        setEntries(data.journals);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    };

    getJournals();

  }, [token]);

  // =========================================
  // SUBMIT JOURNAL KE DATABASE
  // =========================================
  const handleSubmit = async () => {

    if (inputText.trim() === "") return;

    try {

      const response = await fetch(`${API_URL}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          content: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan jurnal");
      }

      const data = await response.json();

      // TAMBAHKAN JOURNAL BARU KE STATE
      setEntries((prev) => [data.journal, ...prev]);

      setInputText("");

    } catch (err) {
      console.error(err);
    }
  };

  // =========================================
  // COLOR CARD
  // =========================================
  const headerColors = [
    "bg-[#CDF4FF] border-[#0592FF]",
    "bg-[#FFEEDB] border-[#FF7B4F]",
    "bg-[#FFFBCC] border-[#FFE100]",
    "bg-[#EAFCDC] border-[#5ACC4B]"
  ];

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <p className="text-xl font-bold">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-2 sm:p-6 md:p-8 lg:p-10">

      <div className="flex flex-col min-h-screen gap-12 w-full">

        {/* HEADER */}
        <div className="h-16 w-screen text-left p-2 m-0">

          <h1 className="font-bold text-2xl md:text-4xl">
            Jurnal
          </h1>

          <p className="text-gray-700 font-semibold">
            Tulis dan lihat semua catatan jurnal mu.
          </p>

        </div>

        {/* INPUT JOURNAL */}
        <div className="min-h-[100px] w-full flex flex-col gap-4 justify-space-between bg-white rounded-2xl p-6">

          <label className="font-bold text-xl md:text-2xl">
            Tulis Jurnal Baru
          </label>

          <div className="flex justify-space-between items-center gap-3">

            {/* INPUT */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit()
              }
              placeholder="Apa yang terjadi hari ini?"
              className="peer w-full h-[40px] rounded-xl text-md text-[#000000] p-2 outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]"
            />

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-34 h-[40px] bg-[#ABE3A9] text-white rounded-xl shadow-md transition-colors duration-300 peer-focus:bg-[#09EB00CC]"
            >
              Submit
            </button>

          </div>
        </div>

        {/* RIWAYAT JOURNAL */}
        <div className="flex flex-col gap-6 pb-20">

          <h2 className="text-2xl font-bold md:text-3xl">
            Riwayat Jurnal
          </h2>

          <div className="flex flex-col gap-4">

            {entries.length === 0 ? (

              <div className="bg-white rounded-2xl p-6 text-center shadow">
                <p className="text-gray-500">
                  Belum ada jurnal
                </p>
              </div>

            ) : (

              entries.map((entry, index) => (

                <div
                  key={entry._id}
                  className="flex flex-col overflow-hidden rounded-3xl border shadow-sm transition-all hover:scale-[1.01]"
                >

                  {/* HEADER DATE */}
                  <div
                    className={`px-6 py-3 border-b font-bold text-md md:text-lg ${
                      headerColors[index % headerColors.length]
                    }`}
                  >

                    {new Date(entry.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="bg-white p-6">

                    <p className="text-gray-700 leading-relaxed">
                      {entry.content}
                    </p>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}