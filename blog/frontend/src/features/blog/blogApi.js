import axios from "axios";

const API_URL = "http://localhost:8000/api/blogs/";

export const addBlogService = async (blog) => {
  const res = await axios.post(`${API_URL}`, blog, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};

export const getBlogService = async () => {
  const res = await axios.get(`${API_URL}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};
