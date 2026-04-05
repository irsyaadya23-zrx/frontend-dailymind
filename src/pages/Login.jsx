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
    <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE] px-6">
        <div className="flex h-[550px] w-[500px] rounded-3xl flex-col justify-center px-6 py-12 lg:px-8 bg-[#27374D]">
        
          {/* Logo & Title */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto h-24 w-auto"
            />
          </div>

          {/* Form */}
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-100 text-left">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-white/100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-100">
                    Password
                  </label>
                  <span className="text-sm text-indigo-400 cursor-pointer hover:text-indigo-300">
                    Forgot password?
                  </span>
                </div>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-2 pr-3 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-white/100"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="mb-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition"
                >
                  Sign in
                </button>
              </div>

              {/* Option Text */}
              <p className="mt-3 text-center text-sm text-gray-400">Or</p>

            {/* Button Google Login */}
            <div className="mb-2">
                <button
                  type="submit"
                  className="flex w-full item-center justify-center gap-3 mt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white-400 transition"
                >
                    <FcGoogle size={20} />
                    Login with Google Account
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{" "}
              <span className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">
                Register
              </span>
            </p>
          </div>
        </div>
    </div>    
  )
}