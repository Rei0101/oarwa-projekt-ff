import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { decodeJWT } from "../utils/helpers";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = decodeJWT(token);
        setUser(decoded.payload);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
