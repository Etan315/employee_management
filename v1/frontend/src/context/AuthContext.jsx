import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    console.log("🔍 Verifying user session...");
    const API_URL = 'http://localhost:5000/api';
    try {
      const res = await fetch(`${API_URL}/verify`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.user) {
        console.log("✅ User verified:", data.user);
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("❌ Failed to verify user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();

  useEffect(() => {
    // Prevent unnecessary fetches on public routes
    const publicPaths = ["/login", "/register", "/forgotpass"];
    const pathname = location?.pathname || "/";

    if (publicPaths.some((p) => pathname.startsWith(p))) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [location]);

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      console.log("👋 Logged out successfully");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
