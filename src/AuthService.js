const BASE_URL = import.meta.env.VITE_API_URL;
import { createAuthClient } from "better-auth/react";
// ====================
// REGISTER
// ====================
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return {
        success: false,
        message: data?.error?.message || data?.message || "Register gagal",
      };
    }

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

// ====================
// LOGIN
// ====================
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.error?.message || data?.message || "Login gagal",
      };
    }

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

// ====================
// LOGIN GOOGLE
// ====================
export const loginWithGoogle = async () => {
  const authclient = createAuthClient({
    baseURL: BASE_URL,
  });
  await authclient.signIn.social({
    provider: "google",
    callbackURL: import.meta.env.CALLBACK_URL,
  });
};

// ====================
// FORGOT PASSWORD
// ====================
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/auth/request-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirectTo: `${APP_URL}/reset-password`,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.error?.message ||
          data?.message ||
          "Gagal mengirim reset password",
      };
    }

    return {
      success: true,
      message: "Link reset password berhasil dikirim ke email",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Tidak bisa connect ke server",
    };
  }
};

// ====================
// LOGOUT
// ====================
export const logout = async () => {
  await fetch(`${BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });
};

// ====================
// GET SESSION
// ====================
export const getSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/get-session`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
