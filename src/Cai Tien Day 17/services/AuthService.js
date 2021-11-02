import http from "./BaseService";

const login = (data) => {
  return http.post("/login", data);
};

const AuthService = {
  login,
};

export default AuthService;
