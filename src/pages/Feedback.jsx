import React, { useState, useEffect } from "react";
import PujianImg from "../assets/pujian.png";
import SaranImg from "../assets/saranfitur.png";
import KeluhanImg from "../assets/keluhan.png";
import LainnyaImg from "../assets/lainnya.png";

const Feedback = () => {

  // API
  
  const API_URL_FEEDBACK = import.meta.env.VITE_API_URL_FEEDBACK;

  // STATE

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);

  const [message, setMessage] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    monthly: 0,
  });

  // GET FEEDBACK
  
  useEffect(() => {

    const getFeedbacks = async () => {

      try {

        const response = await fetch(
          API_URL_FEEDBACK,
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

          console.log("Unauthorized");

          setStats({
            total: 0,
            averageRating: 0,
            monthly: 0,
          });

          return;
        }

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil feedback"
          );
        }

        const data = await response.json();

        console.log(
          "GET FEEDBACKS:",
          data
        );

        // SUPPORT MULTIPLE FORMAT
        const feedbacks =
          data.feedbacks ||
          data.data ||
          data ||
          [];

        // TOTAL
        const total =
          feedbacks.length;

        // AVG RATING
        const averageRating =
          total > 0
            ? (
                feedbacks.reduce(
                  (acc, item) =>
                    acc +
                    (item.rating || 0),
                  0
                ) / total
              ).toFixed(1)
            : 0;

        // BULAN INI
        const currentMonth =
          new Date().getMonth();

        const currentYear =
          new Date().getFullYear();

        const monthly =
          feedbacks.filter((item) => {

            const createdAt =
              new Date(
                item.createdAt
              );

            return (
              createdAt.getMonth() ===
                currentMonth &&
              createdAt.getFullYear() ===
                currentYear
            );
          }).length;

        setStats({
          total,
          averageRating,
          monthly,
        });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    getFeedbacks();

  }, []);

  // CATEGORY

  const categories = [
    {
      id: "pujian",
      label: "Pujian",
      icon: PujianImg,

      activeClass:
        "bg-green-100 border-green-500 text-green-700",
    },

    {
      id: "saran",
      label: "Saran Fitur",
      icon: SaranImg,

      activeClass:
        "bg-yellow-100 border-yellow-500 text-yellow-700",
    },

    {
      id: "keluhan",
      label: "Keluhan",
      icon: KeluhanImg,

      activeClass:
        "bg-orange-100 border-orange-500 text-orange-700",
    },

    {
      id: "lainnya",
      label: "Lainnya",
      icon: LainnyaImg,

      activeClass:
        "bg-blue-100 border-blue-500 text-blue-700",
    },
  ];

  // SUBMIT FEEDBACK

  const handleSubmit = async () => {

    if (
      !selectedCategory ||
      rating === 0 ||
      message.trim() === ""
    ) {

      alert(
        "Isi semua field dulu!"
      );

      return;
    }

    try {

      const response = await fetch(
        API_URL_FEEDBACK,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            category:
              selectedCategory,

            rating,

            message,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "POST FEEDBACK:",
        data
      );

      if (!response.ok) {

        alert(
          data.message ||
            "Gagal mengirim feedback"
        );

        return;
      }

      // RESET
      setSelectedCategory(null);

      setRating(0);

      setMessage("");

      // UPDATE STATS
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
      }));

      alert(
        "Feedback berhasil dikirim!"
      );

    } catch (err) {

      console.error(err);

      alert(
        "Terjadi kesalahan"
      );
    }
  };

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

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
          Feedback
        </h1>

        <p className="text-gray-700 font-semibold">
          Sampaikan pendapat,
          saran, atau laporan mu
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">

          <p className="text-slate-800 font-bold text-sm mb-1">
            Total Feedback
          </p>

          <p className="text-xl font-bold text-slate-800 md:text-3xl">
            {stats.total}
          </p>

        </div>

        {/* AVG RATING */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">

          <p className="text-slate-800 font-bold text-sm mb-1">
            Rating Rata - Rata
          </p>

          <p className="text-xl font-bold text-yellow-500 md:text-3xl">
            {stats.averageRating} ⭐
          </p>

        </div>

        {/* MONTHLY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">

          <p className="text-slate-800 font-bold text-sm mb-1">
            Feedback Bulan Ini
          </p>

          <p className="text-xl font-bold text-slate-800 md:text-3xl">
            {stats.monthly}
          </p>

        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-200">

        <div className="space-y-6">

          {/* CATEGORY */}
          <div>

            <p className="font-semibold text-slate-800 mb-4">
              Kategori
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {categories.map((cat) => (

                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(
                      cat.id
                    )
                  }
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedCategory ===
                    cat.id
                      ? cat.activeClass
                      : "bg-gray-300 border-transparent text-slate-600 hover:bg-slate-200"
                  }`}
                >

                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="w-8 h-12 mb-3 object-contain"
                  />

                  <span className="font-medium">
                    {cat.label}
                  </span>

                </button>
              ))}
            </div>
          </div>

          {/* RATING */}
          <div>

            <p className="font-semibold text-slate-800 mb-2">
              Rating
            </p>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map(
                (star) => {

                  const isActive =
                    hover !== null
                      ? star <= hover
                      : star <=
                        rating;

                  return (

                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      onMouseEnter={() =>
                        setHover(star)
                      }
                      onMouseLeave={() =>
                        setHover(null)
                      }
                      className={`text-3xl transition-transform duration-150 ${
                        isActive
                          ? "text-yellow-400 scale-110"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* MESSAGE */}
          <div>

            <p className="font-semibold text-slate-800 mb-2">
              Pesan
            </p>

            <div className="w-full flex justify-center items-center gap-4">

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Tulis Feedback disini"
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 h-[40px] md:h-auto"
              />

              <button
                onClick={handleSubmit}
                className="bg-green-400 hover:bg-green-500 text-white px-8 py-2 rounded-xl font-semibold transition-colors h-[40px] md:h-auto"
              >
                Submit
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;