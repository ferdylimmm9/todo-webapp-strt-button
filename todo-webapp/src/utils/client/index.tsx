import axios from "axios";
import AuthSession from "../../repositories/auth-session";

const client = axios.create({
  baseURL: "https://task.bullspin.fun/",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = AuthSession.get()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (value) => {
    return value;
  },
  (error) => {
    if (error.response.status === 401) {
      AuthSession.remove();
    }
    return Promise.reject(error);
  },
);

export default client;
