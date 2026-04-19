export default function ToDoList() {
  return(
    <div className="flex justify-center items-center">
      <div className="flex flex-col h-screen gap-12 w-full">
        <div className="h-16 w-screen text-left p-2 m-0">
          <h1 className="font-bold text-4xl">To-Do-List</h1>
          <p className="font-medium text-xl">Kelola tugas-tugasmu dengan efektif</p>
        </div>
        <div className="flex justify-space-between gap-6 item-center h-40">
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Total Tugas</h2>
            <h2 className="text-xl font-semibold">0</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Aktif</h2>
            <h2 className="text-xl font-semibold text-[#0059FF]">0</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-xl h-34 w-full h-full shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold">Selesai</h2>
            <h2 className="text-xl font-semibold text-[#00FF00]">0</h2>
          </div>
        </div>
        <div className="w-full h-31 flex justify-space-between items-center bg-white rounded-xl p-8 gap-2">
          <input
            type="text"
            placeholder="Tambah tugasmu disini"
            className="h-[100%] w-[100%] outline-2 outline-[#000000]/30 rounded-xl text-[#000000]/30 p-3 focus:outline-[#09EB00CC]"></input>
            <button className="w-34 h-[100%] bg-[#ABE3A9] text-white rounded-xl">Tambah</button>
        </div>
      </div>
    </div>
  )
}