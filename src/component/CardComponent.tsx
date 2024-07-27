import React from "react";
import Card from "@mui/material/Card";
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ProductsImgComponent from "./ProductsImgComponent";
import { useNavigate } from "react-router-dom";
import routers from "../routers/routers";

interface itemPropsType {
  data: {
    _id: string;
    images: Array<string>;
    product_name: string;
    base_price: number;
  };
}

const CardComponent: React.FC<itemPropsType> = ({ data }) => {
  const navigate = useNavigate();
  const formattedPrice = new Intl.NumberFormat("th-TH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(data?.base_price);

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ maxWidth: "250px", height: "350px" }} elevation={3}>
        <CardActionArea
          onClick={() => navigate(`${routers.COLLECTIONS}/${data?._id}`)}
        >
          <CardMedia>
            <Box sx={{ width: "250px", height: "250px" }}>
              <ProductsImgComponent images={data?.images} showNav={false} />
            </Box>
          </CardMedia>
          <CardContent>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={data?.product_name}
              >
                {data?.product_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {`Price: ${formattedPrice} bath`}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
};

export default CardComponent;
