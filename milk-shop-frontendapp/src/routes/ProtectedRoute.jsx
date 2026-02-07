
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  debugger;
  // Get the full response from localStorage (it contains the user)
  const storedResponse = localStorage.getItem("user");

  // Parse it and extract the user object
  const response = storedResponse ? JSON.parse(storedResponse) : null;
  const user = response?.user;
  const role = user?.role;

  console.log("USER FROM LOCALSTORAGE:", user);
  console.log("USER ROLE:", role);
  console.log("USER EMAIL:", user?.email);

  if (!response || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;


