import React from "react";
import Card from "@mui/material/Card";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";

interface itemPropsType {
  data: {
    img: Array<string>;
    name: string;
    price: number;
  };
}

const CardComponent: React.FC<itemPropsType> = ({ data }) => {

  return (
    <Card sx={{ maxWidth: 250, height: 350 }}>
      <CardMedia
        component="img"
        height="250"
        image={data?.img[0]}
        alt={data?.name}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {data?.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
