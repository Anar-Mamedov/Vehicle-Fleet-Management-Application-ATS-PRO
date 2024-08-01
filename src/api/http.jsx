import axios from 'axios'
import { getItemWithExpiration } from '../utils/expireToken'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "User-Id": JSON.parse(localStorage.getItem("id"))
  },
})

http.interceptors.request.use(async (config) => {
  const token = await getItemWithExpiration("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
});

http.interceptors.response.use((response) => {
  return response
});

export default http
