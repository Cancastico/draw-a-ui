import axios from "axios";

const baseURL = "http://localhost:11434/api"; // AVELINO

export const AxiosNode = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

