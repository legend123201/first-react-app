import axios from "axios";

export default axios.create({
  baseURL: "https://616185dd374925001763133c.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

//coi video buổi 19 để biết về tenantKey và setToken vào axios
