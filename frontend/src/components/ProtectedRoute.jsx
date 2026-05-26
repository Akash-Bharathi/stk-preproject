import { Navigate } from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function ProtectedRoute({
  children
}) {

  const {
    isAuthenticated
  } = useAuth();

  // If not logged in
  if (!isAuthenticated) {

    return <Navigate to="/login" />;
  }

  // If logged in
  return children;
}

export default ProtectedRoute;