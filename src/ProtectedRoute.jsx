import {Navigate, Outlet} from "react-router";
import {useAuth} from "./context/auth.context";

function ProtectedRoute() {
  const {isloading, isAuthenticated} = useAuth();

  if (isloading) return <h2>Loading....</h2>;
  if (!isloading && !isAuthenticated) return <Navigate to="/Login" remplace />;

  return <Outlet />;
}

export default ProtectedRoute;
