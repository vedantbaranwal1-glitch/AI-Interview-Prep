import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-interview-prep-6h9v.onrender.com",
});

export default api;