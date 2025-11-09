import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in authProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await axiosInstance.get("api/auth/profile"); // protected route
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(`Auth check failed:`, error);
      logout();
    } finally {
      // code that always run no matter which block is executed
      setLoading(false);
    }
  };

  const login = async (userData) => {
    const res = await axiosInstance.post("/api/auth/login", userData);
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      console.log("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updatedUser = async (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      const res = await axiosInstance.patch("/api/auth/update", newUserData);
      setUser(res.data.user);
    } catch (error) {
      console.error("Update user failed:", error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updatedUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};
