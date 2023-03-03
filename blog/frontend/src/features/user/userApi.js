import axios from "axios";

export const registerService = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/register",
      data
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginService = async (data) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    const { data } = res;

    localStorage.setItem("token", data?.token);
    return data;
  } catch (err) {
    console.log(err);
  }
};
