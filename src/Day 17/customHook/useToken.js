import { useState } from "react";

export default function useToken() {

  const getToken = () => {
    let token = sessionStorage.getItem('token');
    if (!token)
      return null;
    return token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    sessionStorage.setItem('token', token)
    setToken(token);
  }

  return {
    token,
    setToken: saveToken
  }
}