import { jwtDecode } from "jwt-decode";
import { OpenAPI } from "@/api";

const isTokenValid = (authToken: string): boolean => {
  try {
    const decoded: { exp?: number } = jwtDecode(authToken);
    if (!decoded.exp) {
      console.error("Token does not contain an expiration time.");
      return false;
    }

    const currentTime = Date.now() / 1000; // Current time in seconds since epoch
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return false;
  }
};

const setSession = (authToken?: string | null): void => {
  if (typeof authToken === "string" && authToken.trim() !== "") {
    // Store token in local storage and set authorization header for axios
    localStorage.setItem("authToken", authToken);
    console.log(authToken)
    OpenAPI.TOKEN = authToken;
  } else {
    // Remove token from local storage and delete authorization header from axios
    localStorage.removeItem("authToken");
    delete OpenAPI.TOKEN;
  }
};

export { isTokenValid, setSession };
