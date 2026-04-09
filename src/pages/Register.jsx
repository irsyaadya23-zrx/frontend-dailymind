import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/dailymind_logo.png"
import { login } from "../AuthService"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword] = useState(false)

  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
  e.preventDefault()

  const result = await login(email, password)

  if (result.success) {
    navigate("/home")
  } else {
    alert(result.message)
  }
}

  return (
    <div className="min-h-screen w-screen flex items-center gap-2 justify-center bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] px-6">
        <div className="flex sm:h-[650px] h-[550px] w-[500px] rounded-3xl flex-col justify-center gap-1 px-6 py-12 lg:px-8 bg-[#1F2A44]/10 shadow-xl">
        
          {/* Logo & Title */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto h-16 w-auto sm:h-24"
            />
          </div>

          {/* Form */}
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#27374D] text-left">
                  Nama Lengkap
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-xl bg-white/5 px-3 py-2 text-[#27374D] outline outline-1 outline-[#27374D] placeholder:text-[#27374D] focus:outline-2 focus:outline-[#27374D]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#27374D] text-left">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl bg-white/5 px-3 py-2 text-[#27374D] outline outline-1 outline-[#27374D] placeholder:text-[#27374D] focus:outline-2 focus:outline-[#27374D]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#27374D]">
                    Password
                  </label>
                </div>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl bg-white/5 px-3 py-2 pr-3 text-[#27374D] outline outline-1 outline-[#27374D] placeholder:text-[#27374D] focus:outline-2 focus:outline-[#27374D]"
                  />
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#27374D]">
                    Konfirmasi Password
                  </label>
                </div>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl bg-white/5 px-3 py-2 pr-3 text-[#27374D] outline outline-1 outline-[#27374D] placeholder:text-[#27374D] focus:outline-2 focus:outline-[#27374D]"
                  />
                </div>
              </div>


              {/* Button */}
              <div className="mb-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-[#27374D] px-3 py-2 text-sm font-semibold text-white hover:bg-[#171F35] transition"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>    
  )
}