const BASE_URL = "http://localhost:3000"; // ganti sesuai backend kamu

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login gagal",
      };
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Tidak bisa connect ke server",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
