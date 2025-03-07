import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userReducer
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
