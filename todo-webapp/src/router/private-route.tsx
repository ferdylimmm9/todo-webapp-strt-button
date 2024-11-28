import { Navigate } from "react-router-dom";
import AuthSession from "../repositories/auth-session";

const PrivateRoute = ({ Component }: { Component(): JSX.Element }) => {
  return AuthSession.get() ? <Component /> : <Navigate to="/signin" />;
};
export default PrivateRoute;
