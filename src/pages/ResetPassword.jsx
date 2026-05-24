import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function ResetPassword() {

  console.log("RESET PAGE RENDER");
  
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get("token");

  console.log(token)

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password,
            token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data?.message || "Gagal reset password");
        return;
      }

      alert("Password berhasil diubah");

      navigate("/login");
    } catch (error) {
      console.error("RESET ERROR:", error);
      alert(error.message);
    }
  };

  return (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#E0C3FC]">

    <div className="max-w-[512px] w-full flex justify-center items-center bg-gradient-to-br from-[#FFFFFF] via-[#FFFFFF]/10 to-[#FFFFFF] p-[2px] rounded-3xl">
      
      <div className="w-full flex items-center justify-center bg-gradient-to-b from-[#FFFFFF]/20 via-[#FFFFFF]/10 to-[#FFFFFF]/40 rounded-3xl p-6">
        
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 w-[350px]"
        >
          <h1 className="text-2xl font-bold text-center">
            Reset Password
          </h1>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-full border-[#27374D] w-full pr-10"
              required
            />

           <button
             type="button"
             onClick={() => setShowPassword(!showPassword)}
             className="absolute right-4 top-1/2 -translate-y-1/2 text-[#27374D]"
           >
             {showPassword ? <FaEyeSlash /> : <FaEye />}
           </button>
         </div>

          <button
            type="submit"
            className="bg-[#27374D] text-white p-2 rounded-full"
          >
            Simpan Password Baru
          </button>
        </form>

      </div>
    </div>
  </div>
);
}