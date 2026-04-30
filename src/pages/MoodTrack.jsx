import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { Smile, Meh, Frown } from "lucide-react";

export default function MoodTrack() {
  // State untuk data chart
  const [moodSeries, setMoodSeries] = useState([{
    name: 'Mood Level',
    data: [0, 0, 0, 0, 0, 0, 0] // Placeholder awal
  }]);

  const [daysLabels, setDaysLabels] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);

  // 1. Fungsi Fetch Data menggunakan useCallback agar stabil
  const fetchUserMood = useCallback(async () => {
    try {
      const token = localStorage.getItem('userToken'); 
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/moods', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const result = response.data; // Ekspektasi: [{score: 4, day: 'MON'}, ...]
      
      if (result && result.length > 0) {
        setMoodSeries([{
          name: 'Mood Level',
          data: result.map(item => item.score)
        }]);
        setDaysLabels(result.map(item => item.day));
      }
    } catch (err) {
      console.error("Gagal mengambil data mood pribadi:", err);
    }
  }, []);

// 2. useEffect untuk load data pertama kali
  useEffect(() => {
    const loadData = async () => {
      await fetchUserMood();
    };
    
    loadData();
    // Komentar di bawah ini untuk membungkam warning ESLint secara aman
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Fungsi Input Mood (POST ke Database)
  const handleMoodInput = async (score) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert("Silahkan login terlebih dahulu");
        return;
      }

      await axios.post('http://localhost:5000/api/moods', { score }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Memanggil ulang fetch data agar chart bergeser/update
      fetchUserMood();
    } catch {
      alert("Gagal menyimpan mood. Pastikan koneksi backend aktif.");
    }
  };

  // 4. Konfigurasi ApexCharts (Efek Gradient Biru)
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: { enabled: true, speed: 350 }
      }
    },
    colors: ['#4F46E5'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: daysLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '11px' } }
    },
    yaxis: {
      min: 0,
      max: 4,
      tickAmount: 4,
      labels: { 
        style: { colors: '#94a3b8' },
        formatter: (val) => Math.floor(val)
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 5
    },
    tooltip: { theme: 'light' }
  };

  const moodButtons = [
    { label: 'Bahagia', icon: Smile, score: 4, color: 'hover:border-green-400 hover:bg-green-50', iconColor: 'text-[#000000]/30' },
    { label: 'Biasa Saja', icon: Meh, score: 3, color: 'hover:border-blue-400 hover:bg-blue-50', iconColor: 'text-[#000000]/30' },
    { label: 'Sedih', icon: Frown, score: 2, color: 'hover:border-yellow-400 hover:bg-yellow-50', iconColor: 'text-[#000000]/30' },
    { label: 'Sangat Sedih', icon: Frown, score: 1, color: 'hover:border-red-400 hover:bg-red-50', iconColor: 'text-[#000000]/30' },
  ];

  return (
    <div className=" md:p-10 w-full p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">Mood Tracker</h2>
        <p className="text-slate-500">Lacak dan pahami suasana hatimu setiap hari</p>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-10 overflow-hidden">
        <Chart options={chartOptions} series={moodSeries} type="area" height={300} />
      </div>

      {/* Input Mood Section */}
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 text-center">
        <h3 className="text-2xl font-bold text-slate-700 mb-10">How Your Mood Today?</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {moodButtons.map((mood) => (
            <button
              key={mood.score}
              onClick={() => handleMoodInput(mood.score)}
              className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-[#000000]/30 bg-slate-50/40 transition-all duration-300 hover:scale-105 active:scale-95 group ${mood.color}`}
            >
              <span className="text-slate-600 font-semibold mb-4 group-hover:text-slate-900 transition-colors">
                {mood.label}
              </span>
              <mood.icon 
                className={`w-10 h-10 ${mood.iconColor} transform group-hover:rotate-12 transition-transform`}/>
            </button>
          ))}
        </div>
      </div>

      {/* Riwayat Mood Table/List Placeholder */}
      <div className="mt-10 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-2xl text-slate-700 mb-4 px-2">Riwayat Mood</h3>
        <div className="border-t border-slate-50 pt-4 px-2">
          <p className="text-slate-400 text-sm italic">
            Menampilkan data 7 hari terakhir berdasarkan aktivitas akun Anda.
          </p>
        </div>
      </div>
    </div>
  );
}