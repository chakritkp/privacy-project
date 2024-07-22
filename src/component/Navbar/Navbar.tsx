import React, { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DrawerMenuLeft from "./DrawerMenuLeft.tsx";
import DrawerMenuRight from "./DrawerMenuRight.tsx";
import { useThemeMode } from "../../context/themeModeContext.tsx";
import routers from "../../routers/routers.ts";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [openDrawerMenuLeft, setOpenDrawerMenuLeft] = useState<boolean>(false);
  const [openDrawerMenuRight, setOpenDrawerMenuRight] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenuProfile = Boolean(anchorEl);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { mode, setMode } = useThemeMode();

  const fetchData = {
    data: [
      {
        img: "https://res.cloudinary.com/dkjfuys7y/image/upload/v1721484810/myImage/dej1flvkb7ni2i9yvqjh.png",
        product_name: "Product name",
        price: 500,
        quantity: 1,
      },
    ],
    meta: {
      count: 1,
    },
  };

  const { data, meta } = fetchData;

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {!isMdUp && (
            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenDrawerMenuLeft(true)}
              >
                <MenuIcon />
              </IconButton>
              <DrawerMenuLeft
                open={openDrawerMenuLeft}
                onClose={() => setOpenDrawerMenuLeft(false)}
              />
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            {isMdUp && (
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
                width={"100%"}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={10}
                    md={6}
                    container
                    justifyContent="center"
                  >
                    <Link
                      to={routers.HOME}
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "#FFF",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        HOME
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={10}
                    md={6}
                    container
                    justifyContent="center"
                  >
                    <Link
                      to={routers.COLLECTIONS}
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "#FFF",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        SHOP NOW
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              marginX={3}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                TIS
              </Typography>
            </Box> */}

            {isMdUp && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      md={6}
                      container
                      justifyContent="center"
                    >
                      <Link
                        to={"/"}
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#FFF",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          FAQ
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      md={6}
                      container
                      justifyContent="center"
                    >
                      <Link
                        to={"/"}
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#FFF",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          ABOUT US
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>

          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenuProfile}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setMode(!mode)}>
                <Switch />
              </MenuItem>
              <MenuItem
                onClick={() => {}}
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {}}
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Logout
              </MenuItem>
            </Menu>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenDrawerMenuRight(true)}
            >
              <Badge badgeContent={meta?.count} color="error">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            <DrawerMenuRight
              open={openDrawerMenuRight}
              onClose={() => setOpenDrawerMenuRight(false)}
              data={data}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
