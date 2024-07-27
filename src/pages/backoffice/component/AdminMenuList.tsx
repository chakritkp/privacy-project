import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import routers from "../../../routers/routers.ts";

const AdminMenuList: React.FC = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [productsMenuMore, setProductsMenuMore] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setProductsMenuMore(false);
  };
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: isCollapsed ? "60px" : "250px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
          transition: "width 0.3s ease",
          backgroundColor: "#86B6F6",
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{
            display: "flex",
            justifyContent: isCollapsed ? "center" : "end",
            transition: "justify-content 0.3s ease",
            width: "100%",
          }}
        >
          <MenuIcon sx={{ color: "#EEEEEE" }} />
        </IconButton>
        <List>
          <ListItemButton onClick={() => navigate(routers.ADMIN)}>
            <ListItem
              sx={{
                height: "100px",
                borderBottom: `0.5px solid #EEEEEE`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isCollapsed ? (
                <AccountCircleIcon sx={{ color: "#EEEEEE" }} />
              ) : (
                <Typography variant="h4" color={"#EEEEEE"}>
                  Admin
                </Typography>
              )}
            </ListItem>
          </ListItemButton>

          <ListItemButton
            onClick={() => setProductsMenuMore(!productsMenuMore)}
            sx={{ display: isCollapsed ? "none" : "flex" }}
          >
            <ListItemText sx={{ display: isCollapsed ? "none" : "block" }}>
              <Typography variant="h6" color={"#EEEEEE"}>
                Products
              </Typography>
            </ListItemText>
            <IconButton
              sx={{
                transform: productsMenuMore ? "rotate(180deg)" : "rotate(0deg)",
                display: isCollapsed ? "none" : "block",
              }}
            >
              <ExpandLess sx={{ color: "#EEEEEE" }} />
            </IconButton>
          </ListItemButton>
          <Collapse
            in={productsMenuMore}
            timeout="auto"
            unmountOnExit
            sx={{
              display: isCollapsed ? "none" : "block",
              backgroundColor: "#176B87",
            }}
          >
            <List
              component="div"
              disablePadding
              sx={{ display: isCollapsed ? "none" : "block" }}
            >
              <ListItemButton
                sx={{ pl: 4, borderBottom: `0.5px solid #EEEEEE` }}
                onClick={() => navigate(routers.ADMIN_PRODUCTS)}
              >
                <ListItemText sx={{ display: isCollapsed ? "none" : "block" }}>
                  <Typography variant="body1" color={"#EEEEEE"}>
                    Products list
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
            <List
              component="div"
              disablePadding
              sx={{ display: isCollapsed ? "none" : "block" }}
            >
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate(routers.ADMIN_PRODUCTS_FORM)}
              >
                <ListItemText sx={{ display: isCollapsed ? "none" : "block" }}>
                  <Typography variant="body1" color={"#EEEEEE"}>
                    Create products
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Paper>
      <div
        style={{
          marginLeft: isMdUp ? (isCollapsed ? "6rem" : "18rem") : "4rem",
          marginRight: "1rem",
          width: "100%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminMenuList;
