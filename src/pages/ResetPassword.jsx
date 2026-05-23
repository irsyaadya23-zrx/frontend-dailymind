import { useState } from "react";

const BASE_URL = "https://be-dailymind.vercel.app";

export default function ResetPassword() {

  const [password, setPassword] = useState("");

  const handleReset = async () => {

    const token = new URLSearchParams(window.location.search).get("token");

    const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: password,
        token,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password berhasil direset");
    } else {
      alert(data?.message || "Reset password gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="w-[400px] p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold mb-5">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Password baru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        <button
          onClick={handleReset}
          className="w-full mt-4 bg-black text-white p-3 rounded-xl"
        >
          Reset Password
        </button>

      </div>

    </div>
  );
}