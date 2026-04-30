import { useState, useEffect } from "react";

export default function Journal() {
  // Taruh di dalam function Journal()
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('dailyMind_jurnal');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputText, setInputText] = useState("");

  // Simpan ke local storage tiap ada perubahan
  useEffect(() => {
    localStorage.setItem('dailyMind_jurnal', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    
    const newEntry = {
      id: Date.now(),
      content: inputText,
      // Tanggal Jurnal
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      })
    };

    // Set jurnal baru paling atas
    setEntries([newEntry, ...entries]);
    setInputText("");
  };

  const headerColors = ["bg-[#CDF4FF] border-[#0592FF]", "bg-[#FFEEDB] border-[#FF7B4F]", "bg-[#FFFBCC] border-[#FFE100]", "bg-[#EAFCDC] border-[#5ACC4B]"];

  return (
    <div className="flex justify-center p-8">
      <div className="flex flex-col min-h-screen gap-12 w-full">
        <div className="h-16 w-screen text-left p-2 m-0">
          <h1 className="font-bold text-4xl">Jurnal</h1>
          <p className="font-medium text-xl">Tulis dan lihat semua catatan jurnal mu.</p>
        </div>
        <div className="min-h-[100px] w-full flex flex-col gap-4 justify-space-between bg-white rounded-2xl p-6">
          <label className="font-bold text-2xl">Tulis Jurnal Baru</label>
          <div className="flex justify-space-between items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Apa yang terjadi hari ini?"
              className="peer w-full rounded-xl text-md text-[#000000] p-2 outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]">
            </input>
            
            {/* Button Submit */}
            <button
              onClick= {handleSubmit} 
              className="w-34 h-[100%] bg-[#ABE3A9] text-white rounded-xl shadow-md transition-colors duration-300 peer-focus:bg-[#09EB00CC]">Submit</button>
          </div>  
        </div>
        
        {/* Riwayat Jurnal */}
        <div className="flex flex-col gap-6 pb-20">
          <h2 className="text-3xl font-bold">Riwayat Jurnal</h2>
          <div className="flex flex-col gap-4">
            {entries.map((entry, index) => (
              <div 
                key={entry.id} 
                className="flex flex-col overflow-hidden rounded-3xl border shadow-sm transition-all hover:scale-[1.01]"
              >
                {/* Bagian Atas (Tanggal) - Berwarna */}
                <div className={`px-6 py-3 border-b font-bold text-lg ${headerColors[index % headerColors.length]}`}>
                  {entry.date}
                </div>

                {/* Bagian Bawah (Isi) - Putih */}
                <div className="bg-white p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}