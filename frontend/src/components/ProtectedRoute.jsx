import { Navigate } from "react-router-dom";
// import { getToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // const token = getToken();
  const { user, isAuthenticated } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}
if (adminOnly && (!user || user.role !== "admin")) {
  return <Navigate to="/" replace />;
}
  return children;
};

export default ProtectedRoute;