import React, { use } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "Lucide-react";

function protectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="fixed inset-0  flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-violet-600 animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-700">
            Loading Content...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default protectedRoute;
