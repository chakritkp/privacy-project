import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

type Props = {};

type FormProducts = {
  product_name: string;
  base_price: number;
};

const ProductsForm = (props: Props) => {
  const { id } = useParams();

  const schema = yup.object().shape({
    product_name: yup.string().required("Product name is required"),
    base_price: yup
      .number()
      .min(1, "Price must be at least 1")
      .required("Base price is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProducts>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {}, [id]);

  const handleSave = (data: any) => {
    console.log(data);
  };
  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          margin: "5rem 0 0 0",
          padding: "1rem",
          backgroundColor: "#FFFFFF",
        }}
      >
        <form onSubmit={handleSubmit(handleSave)} method="">
          <Box
            sx={{
              marginTop: 2,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            {/* <Input type="file" id="file-upload" /> */}
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography component="h1" variant="h3">
                  Sign up
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="product_name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      color="info"
                      size="small"
                      label="Product name"
                      error={!!errors.product_name}
                      helperText={
                        errors.product_name ? errors.product_name.message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="base_price"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      type="number"
                      label="Price"
                      error={!!errors.base_price}
                      helperText={
                        errors.base_price ? errors.base_price.message : null
                      }
                      inputProps={{ min: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductsForm;
