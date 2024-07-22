import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type DrawerMenuRightProps = {
  open: boolean;
  onClose: () => void;
  data: Array<{
    img: string;
    product_name: string;
    price: number;
    quantity: number;
  }>;
};

const DrawerMenuRight: React.FC<DrawerMenuRightProps> = ({
  open,
  onClose,
  data,
}) => {
  const [list, setList] = useState<any>([]);
  const handleLoad = () => {
    setList(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350 }} role="presentation">
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100px"}
          borderBottom={"1px solid light-black"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={3}
            width={"100%"}
          >
            <Typography variant="h3"> Cart</Typography>
            <Button variant="text" color="inherit" onClick={onClose}>
              <CloseIcon />
            </Button>
          </Box>
        </Box>
        <List>
          {list?.length > 0 ? (
            list?.map((product: any) => (
              <ListItem>
                <Grid container gap={2}>
                  <Grid item sm={4}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      width={"100px"}
                      height={"100px"}
                    >
                      <img
                        width={"100%"}
                        height={"100%"}
                        src={product?.img}
                        alt=""
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box>
                      <Typography variant="body1">
                        {product?.product_name}
                      </Typography>
                      <Typography variant="body1">
                        Price: {product?.price}
                      </Typography>
                      <TextField
                        size="small"
                        type="number"
                        label="quantity"
                        defaultValue={product?.quantity}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: 0,
                          max: 100,
                          step: 1,
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            ))
          ) : (
            <Box margin={3}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Your cart is currently empty.
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenuRight;
