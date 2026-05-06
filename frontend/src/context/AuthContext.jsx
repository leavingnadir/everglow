import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persist login across page refresh
    const stored = localStorage.getItem("everglow_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("everglow_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("everglow_user");
  };

  // Boolean values instead of functions — easier to use in JSX conditions
  const isAdmin = user?.role === "ADMIN";
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
