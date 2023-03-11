import axios from "axios";

const API_URL = "/api/auth/";

export const registerService = async (user) => {
  const res = await axios.post(`${API_URL}register`, user);
  const data = res.data;

  if (data) localStorage.setItem("token", "Bearer " + data.data.token);
  return data;
};

export const loginService = async (user) => {
  const res = await axios.post(`${API_URL}login`, user);
  const data = res.data;

  if (data) localStorage.setItem("token", "Bearer " + data.data.token);
  return data;
};

export const getUserService = async () => {
  const res = await axios.get(`${API_URL}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;

  return data;
};
