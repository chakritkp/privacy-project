import { Navigate } from "react-router-dom";
import cookies from "cookie-universal";

type AuthRouteProps = {
  children: React.ReactNode;
};

const Cookies = cookies();

export const AuthTokenRoute = ({ children }: AuthRouteProps) => {
  let token = Cookies.get("token");
  return token ? <>{children}</> : <Navigate to="/sign-in" />;
};

export const AuthNoTokenRoute = ({ children }: AuthRouteProps) => {
  let token = Cookies.get("token");

  return !token ? <>{children}</> : <Navigate to="/" />;
};
