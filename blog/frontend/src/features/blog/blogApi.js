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

export const getBlogsService = async () => {
  const res = await axios.get(`${API_URL}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};

export const getBlogService = async (id) => {
  const res = await axios.get(`${API_URL}${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};

export const editBlogService = async (id, blog) => {
  const res = await axios.put(`${API_URL}${id}`, blog, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};

export const deleteBlogService = async (id) => {
  const res = await axios.delete(`${API_URL}${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = res.data;
  return data;
};
