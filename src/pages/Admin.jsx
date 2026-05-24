import { useState, useEffect } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

import {
  getUsers,
  banUser,
  unbanUser,
  getFeedbacks,
  updateFeedbackStatus,
  getBannedWords,
  addBannedWord,
  deleteBannedWord,
} from "../AdminService";

const feedbackStatuses = [
  "Unread",
  "In Progress",
  "In Review",
  "Resolve",
];

export default function Admin() {

  // ================= USERS =================
  const [users, setUsers] = useState([]);

  // ================= FEEDBACK =================
  const [feedback, setFeedback] = useState([]);

  // ================= BANNED WORDS =================
  const [words, setWords] = useState([]);

  // ================= FORM =================
  const [search, setSearch] = useState("");
  const [newWord, setNewWord] = useState("");
  const [searchedUser, setSearchedUser] =
    useState(null);

  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(
        data.users || data || []
      );

    } catch (error) {

      console.error(error);

    }
  };

  // FETCH FEEDBACK

  const fetchFeedback = async () => {

  try {

    const data =
      await getFeedbacks();

    console.log("FEEDBACK API:", data);

    // PAKSA ARRAY
    const feedbackArray =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.feedbacks)
        ? data.feedbacks
        : Array.isArray(data?.data)
        ? data.data
        : [];

    setFeedback(feedbackArray);

  } catch (error) {

    console.error(error);

    setFeedback([]);

  }
};

  // FETCH BANNED WORDS

  const fetchWords = async () => {

  try {

    const data =
      await getBannedWords();

    console.log(
      "WORDS API:",
      data
    );

    // PAKSA ARRAY
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

    setWords([]);

  }
};

  // INITIAL FETCH

  useEffect(() => {
  const fetchAll = async () => {
    try {
      await Promise.all([
        fetchUsers(),
        fetchFeedback(),
        fetchWords()
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  fetchAll();
}, []);

  // SEARCH USER

  const handleSearchUser = () => {

  // kalau kosong
  if (!search.trim()) {

    setSearchedUser(null);

    return;
  }

  const foundUser = users.find(
    (u) =>
      u.id === search
  );

  setSearchedUser(
    foundUser || null
  );
};

  // TOGGLE USER STATUS

  const handleToggleStatus =
  async () => {

    if (!searchedUser) return;

    try {

      if (
        searchedUser.banned
      ) {

        await unbanUser(
          searchedUser.id
        );

      } else {

        await banUser(
          searchedUser.id
        );

      }

      // REFRESH USERS
      const updatedUsers =
        await getUsers();

      const finalUsers =
        updatedUsers.users ||
        updatedUsers ||
        [];

      setUsers(finalUsers);

      // UPDATE SEARCHED USER
      const updatedUser =
        finalUsers.find(
          (u) =>
            u.id ===
            searchedUser.id
        );

      setSearchedUser(
        updatedUser || null
      );

    } catch (error) {

      console.error(error);

    }
};

  // UPDATE FEEDBACK STATUS

  const handleFeedbackStatus =
    async (id, newStatus) => {

      try {

        await updateFeedbackStatus(
          id,
          newStatus
        );

        await fetchFeedback();

      } catch (error) {

        console.error(error);

      }
    };

  // ADD BANNED WORD

  const handleAddWord =
    async () => {

      if (!newWord.trim()) return;

      try {

        await addBannedWord(
          newWord
        );

        setNewWord("");

        await fetchWords();

      } catch (error) {

        console.error(error);

      }
    };

  // DELETE WORD

  const handleDeleteWord =
    async (id) => {

      try {

        await deleteBannedWord(id);

        await fetchWords();

      } catch (error) {

        console.error(error);

      }
    };

  // STATUS BADGE

  const statusBadge = (status) => {

    if (status === "Active")
      return "bg-green-500 text-white";

    if (status === "Banned")
      return "bg-red-500 text-white";

    if (status === "Unread")
      return "bg-red-400 text-black";

    if (status === "In Progress")
      return "bg-yellow-400 text-black";

    if (status === "In Review")
      return "bg-blue-500 text-white";

    if (status === "Resolve")
      return "bg-green-500 text-white";

    return "bg-gray-400 text-white";
  };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#A1C4FD]
      via-[#C2E9FB]
      to-[#E0C3FC]
      font-['Plus Jakarta Sans']
      pb-10
    ">

      {/* HEADER */}
      <div className="
        border-b
        border-white
        px-5
        py-8
        md:px-8
        md:py-10
      ">

        <h1 className="
          text-[28px]
          md:text-[40px]
          text-[#27374D]
          font-bold
          font-['Poppins']
        ">
          Welcome, Admin Daily Mind
        </h1>

      </div>

      {/* CONTENT */}
      <div className="
        px-4
        md:px-8
        lg:px-16
        flex
        flex-col
        gap-6
        mt-6
      ">

        {/* STAT CARD */}
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
              label:
                "Feedback Belum dibaca",

              value:
                feedback?.filter(
                  (f) =>
                    f.status ===
                    "Unread"
                ).length,
            },
            {
              label:
                "Total Kata Terlarang",

              value: words.length,
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

              <p className="
                text-gray-600
                font-medium
                text-sm
                md:text-base
              ">
                {stat.label}
              </p>

              <h2 className="
                text-2xl
                md:text-3xl
                font-bold
                text-[#27374D]
              ">
                {stat.value}
              </h2>

            </div>

          ))}

        </div>

        {/* USER MONITORING */}
        <div className="
          bg-[#E5E7EB]
          rounded-3xl
          p-3
          shadow-md
          border
          border-white
          overflow-hidden
        ">

          <div className="
            bg-[#A1C4FD]
            text-center
            py-4
            font-bold
            rounded-t-2xl
          ">
            User Monitoring
          </div>

          <div className="overflow-x-auto">

            <div className="
              bg-[#D1D5DB]
              px-6
              py-3
              flex
              text-sm
              font-bold
              text-gray-700
            ">

              <span className="
                w-2/12
                text-center
              ">
                ID
              </span>

              <span className="
                w-4/12
                text-center
              ">
                Email
              </span>

              <span className="
                w-4/12
                text-center
              ">
                Username
              </span>

              <span className="
                w-2/12
                text-center
              ">
                Status
              </span>

            </div>

            <div className="
              max-h-[250px]
              overflow-y-auto
              px-6
              pb-4
            ">

              {users.map((u) => (

                <div
                  key={u.id}
                  className="
                    flex
                    items-start
                    py-3
                    border-b
                    border-gray-100
                    text-sm
                    min-w-[900px]
                    gap-4
                  "
                >

                  <span className="
                    w-[260px]
                    break-all
                    whitespace-normal
                    text-center
                  ">
                    {u.id}
                  </span>

                  <span className="
                    w-[300px]
                    break-all
                    whitespace-normal
                    text-center
                  ">
                    {u.email}
                  </span>

                  <span className="
                    flex-1
                    break-all
                    whitespace-normal
                    text-center
                  ">
                    {u.name}
                  </span>

                  <span className="
                    w-[120px]
                    flex
                    justify-center
                  ">

                    <span className={`
                      px-4
                      py-1
                      rounded-full
                      text-[10px]
                      font-bold
                      ${
                        statusBadge(
                          u.banned
                            ? "Banned"
                            : "Active"
                        )
                      }
                    `}>

                      {
                        u.banned
                          ? "Banned"
                          : "Active"
                      }

                    </span>

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* FEEDBACK */}
        <div className="
          bg-[#E5E7EB]
          rounded-3xl
          p-3
          shadow-md
          border
          border-white
          overflow-hidden
        ">

          <div className="
            bg-[#D8B4FE]
            text-center
            py-4
            font-bold
            rounded-t-2xl
          ">
            Laporan Feedback Pengguna
          </div>

          <div className="overflow-x-auto">

            <div className="
              bg-[#D1D5DB]
              px-6
              py-3
              flex
              text-sm
              font-bold
              text-gray-700
            ">

              <span className="
                w-2/12
                text-center
              ">
                Id Feed
              </span>

              <span className="
                w-3/12
                text-center
              ">
                Kategori
              </span>

              <span className="
                w-5/12
                text-center
              ">
                Isi Pesan
              </span>

              <span className="
                w-2/12
                text-center
              ">
                Status
              </span>

            </div>

            <div className="
              max-h-[250px]
              overflow-y-auto
              px-6
              pb-4
            ">

              {feedback?.map((f) => (

                <div
                  key={f.id}
                  className="
                    flex
                    items-start
                    py-3
                    border-b
                    border-gray-400
                    text-sm
                    text-center
                    min-w-[850px]
                  "
                >

                  <span className="w-2/12">
                    {f.id}
                  </span>

                  <span className="
                    w-3/12
                    break-words
                    whitespace-normal
                    px-2
                  ">
                    {f.category}
                  </span>

                  <span className="
                    w-5/12
                    text-left
                    px-4
                    break-words
                    whitespace-normal
                  ">
                    {f.message}
                  </span>

                  <span className="
                    w-2/12
                    flex
                    justify-center
                  ">

                    <select
                      value={f.status}
                      onChange={(e) =>
                        handleFeedbackStatus(
                          f.id,
                          e.target.value
                        )
                      }
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-[10px]
                        font-bold
                        outline-none
                        cursor-pointer
                        ${statusBadge(f.status)}
                      `}
                    >

                      {feedbackStatuses.map(
                        (status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>

                        )
                      )}

                    </select>

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* SENSOR KATA */}
        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-4
          md:p-6
          border
          border-white
        ">

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
              onChange={(e) =>
                setNewWord(
                  e.target.value
                )
              }
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
              "
            />

            <button
              onClick={
                handleAddWord
              }
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
              "
            >

              <Plus
                size={20}
                strokeWidth={3}
              />

              Tambah

            </button>

          </div>

          <div className="
            flex
            flex-wrap
            gap-2
          ">

            {words?.map((w) => (

              <div
                key={w.id}
                className="
                  bg-red-400
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-medium
                  flex
                  items-center
                  gap-2
                "
              >

                {w.word}

                <button
                  onClick={() =>
                    handleDeleteWord(
                      w.id
                    )
                  }
                >

                  <Trash2 size={14} />

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* SEARCH USER */}
        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-4
          md:p-6
          border
          border-white
        ">

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
              placeholder="Masukan User Id"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                // kalau input kosong
                if (!value.trim()) {

                  setSearchedUser(null);

                }
              }}
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                outline-none
              "
            />

            <button
              onClick={
                handleSearchUser
              }
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
              "
            >

              <Search size={18} />

              Search

            </button>

          </div>

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

                <p className="
                  text-lg
                  font-bold
                  text-[#27374D]
                ">

                  ID:
                  {
                    searchedUser.id
                  }

                </p>

                <p className="
                  text-sm
                  text-gray-600
                ">

                  {
                    searchedUser.username
                  }

                </p>

              </div>

              <button
                onClick={
                  handleToggleStatus
                }
                className={`
                  px-6
                  py-3
                  rounded-xl
                  text-white
                  font-bold
                  ${
                    (
                      searchedUser.banned
                    ) === "Banned"
                      ? `
                        bg-green-500
                      `
                      : `
                        bg-red-500
                      `
                  }
                `}
              >

                {
                  searchedUser.banned
                    ? "Unban User"
                    : "Ban User"
                }

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}