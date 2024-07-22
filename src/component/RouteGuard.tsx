import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextProps } from "../context/UserContext";

type RouteGuardProps = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as UserContextProps;

  useEffect(() => {
    console.log(!user)
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  return <>{children}</>;
};

export default RouteGuard;
