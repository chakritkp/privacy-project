import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Drawer, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type DrawerMenuLeftProps = {
  open: boolean;
  onClose: () => void;
};

const menuItem = [
  { name_list: "HOME", path: "/" },
  { name_list: "SHOP NOW", path: "/" },
  { name_list: "FAQ", path: "/" },
  { name_list: "ABOUT US", path: "/" },
];

const DrawerMenuLeft: React.FC<DrawerMenuLeftProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"start"}
          width={"100%"}
          height={"50px"}
          borderBottom={"1px solid light-black"}
        >
          <Button variant="text" color="inherit" onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <List>
          {menuItem.map((menu) => (
            <ListItem key={menu.path}>
              <Link
                to={menu.path}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#333333",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {menu.name_list}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenuLeft;
