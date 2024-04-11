import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export const userConfirmation = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    try {
      let response = await api.get("users/");
      if (response.status === 200) {
        return response.data.user;
      }
    } catch (error) {
      console.error("Error fetching user confirmation:", error);
    }
    delete api.defaults.headers.common["Authorization"];
  }
  return null;
};

export const userRegistration = async (email, password) => {
  try {
    let response = await api.post("users/signup/", {
      email: email,
      password: password,
    });
    if (response.status === 201) {
      let { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      //!Doesnt Work need to change
      await userLogIn(email, password);

      return user.email;
    } else {
      console.error("Registration failed:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }
};

export const userLogIn = async (email, password) => {
  try {
    let response = await api.post("users/login/", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      let { user, token } = response.data;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user;
    } else {
      console.error("Login failed:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

export const userLogOut = async () => {
  try {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      return null;
    } else {
      console.error("Logout failed:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};

export const getUsersLists = async () => {
  try {
    let response = await api.get("lists/");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to get user lists:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error getting user lists:", error.message);
    return [];
  }
};
