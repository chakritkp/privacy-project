import { useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

type LayoutComponentProps = {};

const LayoutComponent: React.FC<LayoutComponentProps> = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LayoutComponent;
