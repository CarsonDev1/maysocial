import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "http://localhost:5000/api",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error
  }
)

export default api
