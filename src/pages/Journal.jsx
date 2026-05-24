import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBannedWords } from "../AdminService";

export default function Journal() {

  // LOCATION

  const location = useLocation();

  // API

  const API_URL_JOURNAL = import.meta.env.VITE_API_URL_JOURNAL;

  // STATE

  const [entries, setEntries] =
    useState([]);

  const [inputText, setInputText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [words, setWords] =
    useState([
      { word: "bego" },
      { word: "tolol" }
    ]);

  // DRAFT DARI PAGE LAIN

  useEffect(() => {

    if (location.state?.draft) {

      setInputText(
        location.state.draft
      );
    }

  }, [location.state]);

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

        setWords(wordsArray);

      } catch (error) {

        console.error(error);
      }
    };

  fetchWords();

}, []);

    useEffect(() => {
      console.log("WORDS:", words);
    }, [words]);

  // GET JOURNALS

  useEffect(() => {

    const getJournals = async () => {

      try {

        const response = await fetch(
          API_URL_JOURNAL,
          {
            method: "GET",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",
          }
        );

        // BELUM LOGIN
        if (response.status === 401) {

          console.log(
            "Unauthorized"
          );

          setEntries([]);

          return;
        }

        if (!response.ok) {

          throw new Error(
            "Gagal mengambil jurnal"
          );
        }

        const data =
          await response.json();

        console.log(
          "GET JOURNALS:",
          data
        );

        // SUPPORT MULTIPLE FORMAT
        const journals =
          data.journals ||
          data.data ||
          data ||
          [];

        setEntries(journals);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    getJournals();

  }, []);

  // SUBMIT JOURNAL

  const handleSubmit = async () => {

    if (
      inputText.trim() === ""
    ) return;

    try {

      const response = await fetch(
        API_URL_JOURNAL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            content: inputText,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "POST JOURNAL:",
        data
      );

      if (!response.ok) {

        alert(
          data.message ||
            "Gagal membuat jurnal"
        );

        return;
      }

      // SUPPORT MULTIPLE FORMAT
      const newJournal =
        data.journal ||
        data.data ||
        data;

      // TAMBAH KE STATE
      setEntries((prev) => [
        newJournal,
        ...prev,
      ]);

      // EVENT UPDATE
      window.dispatchEvent(
        new Event("dataUpdated")
      );

      // RESET INPUT
      setInputText("");

    } catch (err) {

      console.error(err);

      alert(
        "Terjadi kesalahan"
      );
    }
  };

  // DELETE JOURNAL

  const handleDelete =
    async (id) => {

      try {

        console.log(
        "DELETE ID:",
        id
      );

      console.log(
        "DELETE URL:",
        `${API_URL_JOURNAL}/${id}`
      );

        const response = await fetch(
          `${API_URL_JOURNAL}/${id}`,
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",
          }
        );

        const data = await response.json();
          console.log("DELETE RESPONSE:", data);

        if (!response.ok) {

          throw new Error(
            "Gagal menghapus jurnal"
          );
        }

        // HAPUS DARI UI
        setEntries((prev) =>
          prev.filter(
            (entry) =>
              entry.id !== id
          )
        );

      } catch (err) {

        console.error(err);

        alert(
          "Gagal menghapus jurnal"
        );
      }
    };

  // HEADER COLORS

  const headerColors = [
    "bg-[#CDF4FF] border-[#0592FF]",
    "bg-[#FFEEDB] border-[#FF7B4F]",
    "bg-[#FFFBCC] border-[#FFE100]",
    "bg-[#EAFCDC] border-[#5ACC4B]",
  ];

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
              onChange={(e) =>
                setInputText(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleSubmit()
              }
              placeholder="Apa yang terjadi hari ini?"
              className="peer w-full h-[40px] rounded-xl text-md text-[#000000] p-2 outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]"
            />

            {/* BUTTON */}
            <button
              onClick={
                handleSubmit
              }
              className="w-34 h-[40px] bg-[#ABE3A9] hover:bg-[#09EB00CC] text-white rounded-xl shadow-md transition-colors duration-300"
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

            {entries.length ===
            0 ? (

              <div className="bg-white rounded-2xl p-6 text-center shadow">

                <p className="text-gray-500">
                  Belum ada jurnal
                </p>

              </div>

            ) : (

              entries.map(
                (
                  entry,
                  index
                ) => (

                  <div
                    key={
                      entry.id
                    }
                    className="flex flex-col overflow-hidden rounded-3xl border shadow-sm transition-all hover:scale-[1.01]"
                  >

                    {/* HEADER DATE */}
                    <div
                      className={`px-6 py-3 border-b font-bold text-md md:text-lg ${
                        headerColors[
                          index %
                            headerColors.length
                        ]
                      }`}
                    >

                      {new Date(
                        entry.createdAt
                      ).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month:
                            "long",
                          year:
                            "numeric",
                        }
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="bg-white p-6">

                      <p className="text-gray-700 leading-relaxed">
                        {
                          censorText(entry.content)
                        }
                      </p>

                      {/* DELETE BUTTON */}
                      <div className="flex justify-end mt-4">

                        <button
                          onClick={() =>
                            handleDelete(
                              entry.id
                            )
                          }
                          className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-xl text-sm font-semibold transition"
                        >
                          Hapus
                        </button>

                      </div>

                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}