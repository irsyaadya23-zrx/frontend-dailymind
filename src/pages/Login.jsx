import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/dailymind_logo.png"
import { login } from "../AuthService"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC] px-6">
        <div className="flex h-[550px] w-[500px] rounded-3xl flex-col justify-center px-6 py-12 lg:px-8 bg-[#1F2A44]/10 shadow-xl">
        
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
                  <span className="text-sm text-[#27374D] cursor-pointer hover:text-[#171F35] underline">
                    Forgot password?
                  </span>
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

              {/* Option Text */}
              <p className="mt-3 text-center text-sm text-[#27374D]">Atau Masuk Dengan</p>

            {/* Button Google Login */}
            <div className="mb-2">
                <button
                  type="submit"
                  className="flex w-full item-center justify-center gap-3 mt-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#27374D] hover:bg-[#F7F7F7] transition"
                >
                    <FcGoogle size={20} />
                    Login dengan Akun Google
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-sm text-[#27374D]">
              Belum punya akun?{" "}
              <span className="font-bold text-[#27374D] hover:text-[#171F35] underline cursor-pointer">
                Daftar Sekarang
              </span>
            </p>
          </div>
        </div>
    </div>    
  )
}