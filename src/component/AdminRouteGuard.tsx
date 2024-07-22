import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext, UserContextProps } from "../context/UserContext";

type AdminRouteGuardProps = {
  children: React.ReactNode;
};

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as UserContextProps;
 
  useEffect(() => {
    console.log(user?.role !== 1)
    if (user?.role !== 1) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default AdminRouteGuard;
