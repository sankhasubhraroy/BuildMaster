import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
});

axios.defaults.headers.common["Content-Type"] = "application/json";
