import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  withCredentials: true,
  baseURL: "https://cs422.onrender.com/18.142.128.26",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export { instance };