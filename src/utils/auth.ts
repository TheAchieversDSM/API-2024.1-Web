import * as jwt_decode from "jwt-decode";

export default function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt_decode.jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp !== undefined && decoded.exp > currentTime) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  } else {
    return false;
  }
}