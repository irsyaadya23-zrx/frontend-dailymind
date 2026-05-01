import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import { Smile, Meh, Frown } from "lucide-react";

export default function MoodTrack() {
  const [moodSeries, setMoodSeries] = useState([{ name: 'Mood Level', data: [0, 0, 0, 0, 0, 0, 0] }]);
  const [daysLabels, setDaysLabels] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);
  const [fullDatesLabels, setFullDatesLabels] = useState([]); 
  const [todayMood, setTodayMood] = useState(null); 
  const [historyData, setHistoryData] = useState([]); // State baru untuk Riwayat Mood

  const get7DaysInfo = () => {
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    
    const days = [];
    const fullDates = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(dayNames[d.getDay()]);
      fullDates.push(`${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`);
    }
    return { days, fullDates };
  };

  const fetchUserMood = useCallback(() => {
    try {
      const storedMoods = JSON.parse(localStorage.getItem('user_moods')) || [];
      const { days, fullDates } = get7DaysInfo(); 
      
      const chartData = days.map(dayLabel => {
        const found = storedMoods.find(m => m.day === dayLabel);
        return found ? found.score : 0; 
      });

      setDaysLabels(days);
      setFullDatesLabels(fullDates);
      setMoodSeries([{ name: 'Mood Level', data: chartData }]);
      
      // Update data riwayat
      setHistoryData([...storedMoods].reverse());

      const todayName = days[6]; 
      const lastEntry = storedMoods[storedMoods.length - 1];
      if (lastEntry && lastEntry.day === todayName) {
        setTodayMood(lastEntry.score);
      }
    } catch (err) {
      console.error("Gagal mengambil data mood pribadi:", err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserMood();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUserMood]);

  const handleMoodInput = (score) => {
    try {
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      
      const d = new Date();
      const today = dayNames[d.getDay()];
      // Tanggal untuk riwayat
      const fullDateStr = `${today}, ${d.getDate()} ${monthNames[d.getMonth()]}`;

      const storedMoods = JSON.parse(localStorage.getItem('user_moods')) || [];
      const lastEntry = storedMoods[storedMoods.length - 1];

      if (lastEntry && lastEntry.day === today) {
        alert("Kamu sudah mengisi mood hari ini. Kembali lagi besok ya!");
        return; 
      }

      // fullDatestr riwayat
      const newEntry = { score, day: today, fullDate: fullDateStr };
      storedMoods.push(newEntry);

      if (storedMoods.length > 7) {
        storedMoods.shift();
      }

      localStorage.setItem('user_moods', JSON.stringify(storedMoods));
      
      setTodayMood(score); 
      fetchUserMood();
    } catch {
      alert("Gagal menyimpan mood ke penyimpanan lokal.");
    }
  };

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true, easing: 'easeinout', speed: 800 }
    },
    colors: ['#2D5BFF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] }
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
      labels: { style: { colors: '#94a3b8' }, formatter: (val) => Math.floor(val) }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 5 },
    tooltip: { 
      theme: 'light',
      x: {
        formatter: function (val, opts) {
          if (fullDatesLabels.length > 0 && opts.dataPointIndex !== undefined) {
            return fullDatesLabels[opts.dataPointIndex];
          }
          return val;
        }
      }
    }
  };

  const moodButtons = [
    { label: 'Bahagia', icon: Smile, score: 4, 
      activeClass: 'bg-green-100 border-green-500 text-green-700', activeIcon: 'text-green-600',
      hoverClass: 'hover:border-[#5ACC4B] hover:bg-[#EAFCDC]' },
    { label: 'Biasa Saja', icon: Meh, score: 3, 
      activeClass: 'bg-slate-200 border-slate-500 text-slate-700', activeIcon: 'text-slate-600',
      hoverClass: 'hover:border-#FFE100 hover:bg-[#FFFBCC]' },
    { label: 'Sedih', icon: Frown, score: 2, 
      activeClass: 'bg-yellow-100 border-yellow-500 text-yellow-700', activeIcon: 'text-yellow-600',
      hoverClass: 'hover:border-[#FF7B4F] hover:bg-[#FFEEDB]' },
    { label: 'Sangat Sedih', icon: Frown, score: 1, 
      activeClass: 'bg-red-100 border-red-500 text-red-700', activeIcon: 'text-red-600',
      hoverClass: 'hover:border-[#FF5F38] hover:bg-[#FFD0AF]' },
  ];

  return (
    <div className="md:p-10 w-full p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-slate-800">Mood Tracker</h2>
        <p className="text-gray-700 font-semibold">Lacak dan pahami suasana hatimu setiap hari</p>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-10 overflow-hidden">
        <Chart options={chartOptions} series={moodSeries} type="area" height={300} />
      </div>

      {/* Input Mood */}
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 text-center">
        <h3 className="text-2xl font-bold text-slate-700 mb-10">How Your Mood Today?</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {moodButtons.map((mood) => {
            const isAnsweredToday = todayMood !== null;
            const isSelected = todayMood === mood.score;
            
            let btnClasses = "flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-300 group ";
            let iconClasses = "w-10 h-10 transition-transform ";
            let textClasses = "font-semibold mb-4 transition-colors ";

            if (isAnsweredToday) {
              if (isSelected) {
                btnClasses += `border-2 scale-105 ${mood.activeClass}`;
                iconClasses += mood.activeIcon;
                textClasses += "text-inherit";
              } else {
                btnClasses += "bg-[#DEDEDE] border-2 border-transparent cursor-not-allowed opacity-70";
                iconClasses += "text-slate-400";
                textClasses += "text-slate-500";
              }
            } else {
              btnClasses += `bg-slate-50/40 border-2 border-[#000000]/30 hover:scale-105 active:scale-95 cursor-pointer ${mood.hoverClass}`;
              iconClasses += "text-[#000000]/30 transform group-hover:rotate-12";
              textClasses += "text-slate-600 group-hover:text-slate-900";
            }

            return (
              <button
                key={mood.score}
                onClick={() => !isAnsweredToday && handleMoodInput(mood.score)}
                disabled={isAnsweredToday}
                className={btnClasses}
              >
                <span className={textClasses}>
                  {mood.label}
                </span>
                <mood.icon className={iconClasses} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Riwayat */}
      <div className="mt-10 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-2xl text-slate-700 mb-4 px-2">Riwayat Mood</h3>
        <div className="border-t border-slate-50 pt-4 px-2">
          
          {/* Mapping State historyData */}
          {historyData.length > 0 ? (
            <div className="flex flex-col gap-3 mt-2">
              {historyData.map((item, index) => {
                const moodDetail = moodButtons.find(m => m.score === item.score);
                const Icon = moodDetail ? moodDetail.icon : Meh;

                return (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className={`p-3 rounded-xl border ${moodDetail?.activeClass || 'bg-slate-200'}`}>
                      <Icon className={`w-6 h-6 ${moodDetail?.activeIcon || 'text-slate-600'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700">{moodDetail?.label}</h4>
                      <p className="text-sm text-slate-500">{item.fullDate || item.day}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-sm italic">
              Belum ada data mood 7 hari terakhir. Mulai lacak perasaanmu hari ini!
            </p>
          )}

        </div>
      </div>
    </div>
  );
}