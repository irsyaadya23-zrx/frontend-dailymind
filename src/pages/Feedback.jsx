import React, { useState } from 'react';
import PujianImg from '../assets/pujian.png';
import SaranImg from '../assets/saranfitur.png';
import KeluhanImg from '../assets/keluhan.png';
import LainnyaImg from '../assets/lainnya.png';

const Feedback = () => {
  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const categories = [
  { id: 'pujian', label: 'Pujian', icon: PujianImg, activeClass: 'bg-green-100 border-green-500 text-green-700' },
  { id: 'saran', label: 'Saran Fitur', icon: SaranImg, activeClass: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
  { id: 'keluhan', label: 'Keluhan', icon: KeluhanImg, activeClass: 'bg-orange-100 border-orange-500 text-orange-700' },
  { id: 'lainnya', label: 'Lainnya', icon: LainnyaImg, activeClass: 'bg-blue-100 border-blue-500 text-blue-700' },
];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Feedback</h1>
        <p className="text-slate- font-semibold">Sampaikan pendapat, saran, atau laporan mu</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-800 font-bold text-sm mb-1">Total Feedback</p>
          <p className="text-3xl font-bold text-slate-800">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-800 font-bold 00 text-sm mb-1">Rating Rata - Rata</p>
          <p className="text-3xl font-bold text-yellow-500">0.0 ⭐</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-800 font-bold text-sm mb-1">Feedback Bulan Ini</p>
          <p className="text-3xl font-bold text-slate-800">0</p>
        </div>
      </div>

      {/* Feedback Form Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-200">
        <div className="space-y-6">
          {/* Kategori */}
          <div>
            <p className="font-semibold text-slate-800 mb-4">Ketegori</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedCategory === cat.id 
                    ? cat.activeClass 
                    : 'bg-gray-300 border-transparent text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <img src={cat.icon} alt={cat.label} className="w-8 h-12 mb-3 object-contain" />
                  <span className="font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="font-semibold text-slate-800 mb-2">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-slate-300'}`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Pesan */}
          <div>
            <p className="font-semibold text-slate-800 mb-2">Pesan</p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Tulis Feedback disini"
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-green-400 hover:bg-green-500 text-white px-8 py-2 rounded-xl font-semibold transition-colors">
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