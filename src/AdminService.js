const BASE_URL = "https://be-dailymind.vercel.app";

// ================= USERS =================
export const getUsers = async () => {
  try {

    const response = await fetch(
      `${BASE_URL}/api/auth/admin/list-users`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return [];
  }
};

// ================= BAN USER =================
export const banUser = async (userId) => {

  try {

    const response = await fetch(
      `${BASE_URL}/api/auth/admin/ban-user`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      "BAN USER:",
      data
    );

    return data;

  } catch (error) {

    console.error(error);

  }
};

// ================= UNBAN USER =================
export const unbanUser = async (userId) => {

  try {

    const response = await fetch(
      `${BASE_URL}/api/auth/admin/unban-user`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      "UNBAN USER:",
      data
    );

    return data;

  } catch (error) {

    console.error(error);

  }
};

// ================= FEEDBACK =================
export const getFeedbacks = async () => {

  try {

    const response = await fetch(
      `${BASE_URL}/feedbacks`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return [];
  }
};

// ================= UPDATE FEEDBACK =================
export const updateFeedbackStatus =
  async (id, status) => {

    try {

      const response = await fetch(
        `${BASE_URL}/admin/feedbacks/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            status,
          }),
        }
      );

      return await response.json();

    } catch (error) {

      console.error(error);

    }
  };

// ================= BANNED WORDS =================
export const getBannedWords = async () => {

  try {

    const response = await fetch(
      `${BASE_URL}/admin/banned-words`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return [];
  }
};

// ================= ADD BANNED WORD =================
export const addBannedWord = async (word) => {

  try {

    const response = await fetch(
      `${BASE_URL}/admin/banned-words`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          word,
        }),
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

  }
};

// ================= DELETE BANNED WORD =================
export const deleteBannedWord =
  async (id) => {

    try {

      const response = await fetch(
        `${BASE_URL}/admin/banned-words/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        }
      );

      return await response.json();

    } catch (error) {

      console.error(error);

    }
  };