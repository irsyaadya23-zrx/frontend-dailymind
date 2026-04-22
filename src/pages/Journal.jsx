export default function Journal() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col h-screen gap-12 w-full">
        <div className="h-16 w-screen text-left p-2 m-0">
          <h1 className="font-bold text-4xl">Jurnal</h1>
          <p className="font-medium text-xl">Tulis dan lihat semua catatan jurnal mu.</p>
        </div>
        <div class="min-h-[100px] w-full flex flex-col gap-4 justify-space-between bg-white rounded-2xl p-6">
          <label className="font-bold text-2xl">Tulis Jurnal Baru</label>
          <div className="flex justify-space-between items-center gap-3">
            <input
              type="text"
              placeholder="Apa yang terjadi hari ini?"
              className="peer w-full rounded-xl text-md text-[#000000] p-2 outline-2 outline-[#000000]/30 focus:outline-[#09EB00CC]">
            </input>
            <button className="w-34 h-[100%] bg-[#ABE3A9] text-white rounded-xl shadow-md transition-colors duration-300 peer-focus:bg-[#09EB00CC]">Submit</button>
          </div>  
        </div>
        <div className="w-full flex-col gap-3">
          <h1 className="text-3xl font-bold">Riwayat Jurnal</h1>
          <div className="w-full h-[100px]">

          </div>
        </div>
      </div>
    </div>
  )
}