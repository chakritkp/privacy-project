import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ProductsImgComponent from "../component/ProductsImgComponent";

type Props = {};

const ProductById = (props: Props) => {
  const { id } = useParams();
  return (
    <Container component={"main"} maxWidth={"lg"}>
      <Paper elevation={3} sx={{ height: "100vh", paddingTop: 10 }}>
        <Stack margin={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={8}>
              <Box sx={{ maxWidth: "600px", maxHeight: "600px", height: '400px' }}>
                <ProductsImgComponent images={[]} showNav={true} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ maxWidth: "500px", height: "500px" }}></Box>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProductById;
