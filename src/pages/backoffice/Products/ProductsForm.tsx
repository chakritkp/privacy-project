import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
} from "@mui/material";

import ProductsImgComponent from "../../../component/ProductsImgComponent";
import UploadFile from "../../../component/InputComponent/UploadFile";

import OptionComponent from "./component/OptionComponent";

const schema = yup.object().shape({
  images: yup
    .array()
    .of(
      yup
        .mixed()
        .required("File is requierd")
        .test(
          "fileSize",
          "File is too large",
          (value: any) => value && value.size <= 2000000
        )
        .test(
          "fileType",
          "Unsupported File Format",
          (value: any) =>
            value && ["image/jpeg", "image/png"].includes(value.type)
        )
    )
    .required("At least one file is required")
    .max(5, "You can only upload up to 5 images"),
  products_name: yup.string().required("Product name is required"),
  category: yup.string().required("Please add category"),
  description: yup.string(),
  base_price: yup
    .number()
    .min(1, "Price must be at least 1")
    .required("Base price is required"),
  total_quantity: yup
    .number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  options: yup.object().shape({
    options_name: yup.string(),
    types: yup.array().of(
      yup.object().shape({
        type_name: yup.string(),
        type_image: yup.array().of(
          yup
            .mixed()
            .test(
              "fileSize",
              "File is too large",
              (value: any) => value && value.size <= 2000000 // 2MB
            )
            .test(
              "fileType",
              "Unsupported File Format",
              (value: any) =>
                value && ["image/jpeg", "image/png"].includes(value.type)
            )
        ),
        price: yup.number().min(1, "Price must be at least 1"),
        quantity: yup.number().min(1, "Quantity must be at least 1"),
        value: yup.array().of(
          yup.object().shape({
            value_name: yup.string(),
            price: yup.number().min(1, "Price must be at least 1"),
            value_image: yup.array().of(
              yup
                .mixed()
                .test(
                  "fileSize",
                  "File is too large",
                  (value: any) => value && value.size <= 2000000 // 2MB
                )
                .test(
                  "fileType",
                  "Unsupported File Format",
                  (value: any) =>
                    value && ["image/jpeg", "image/png"].includes(value.type)
                )
            ),
            quantity: yup.number().min(1, "Quantity must be at least 1"),
          })
        ),
      })
    ),
  }),
});

const ProductsForm: React.FC = () => {
  const { id } = useParams();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<
    {
      category_name: string;
    }[]
  >([{ category_name: "Category 1" }, { category_name: "Category 2" }]);
  const [changeStateOption, setChangeStateOption] = useState<string | null>(
    null
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      images: [],
      description: "description",
      base_price: 300,
      total_quantity: 20,
      products_name: "เสื้อ",
      options: {
        options_name: "สี",
        // types: [
        //   {
        //     type_name: "สีฟ้า",
        //     price: 300,
        //     quantity: 10,
        //     value: [
        //       {
        //         value_name: "M",
        //         price: 250,
        //         quantity: 5,
        //       },
        //       {
        //         value_name: "L",
        //         price: 250,
        //         quantity: 5,
        //       },
        //     ],
        //   },
        // ],
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {}, [id]);

  const files = methods.watch("images") || null;

  const handleImage = (files: any) => {
    if (!files) {
      return;
    }
    const newPreviews = Array.from(files).map((file: any) => {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
    });
    setPreviewImages([...newPreviews]);
  };

  useEffect(() => {
    if (files) {
      handleImage(files);
    }
  }, [files]);

  const handleSave = (data: any) => {
    const currentOptions = methods.getValues("options.types") || [];

    if (!data) {
      return;
    }

    const updateOptionType = [...currentOptions, data];

    methods.setValue("options.types", updateOptionType);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container component={"main"} maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              margin: "5rem 0 0 0",
              padding: "1rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <Box sx={{ width: "200px", height: "200px" }}>
                    <ProductsImgComponent
                      images={previewImages}
                      showNav={true}
                    />
                  </Box>
                </Stack>

                <UploadFile name="images" limit={5} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <Controller
                    control={control}
                    name="products_name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        color="primary"
                        size="small"
                        label="Product name"
                        error={!!errors.products_name}
                        helperText={
                          errors.products_name
                            ? errors.products_name.message
                            : null
                        }
                      />
                    )}
                  />
                  {/* <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Autocomplete
                        fullWidth
                        {...field}
                        options={categoryOptions || []}
                        getOptionLabel={(option: any) => option?.category_name}
                        size="small"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Category"}
                            onChange={handleInputChange}
                          />
                        )}
                      />
                    )}
                  /> */}
                  <Box>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={changeStateOption}
                      onChange={(e: any) =>
                        setChangeStateOption(e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="no-options"
                        control={<Radio />}
                        label="No options"
                      />
                      <FormControlLabel
                        value="options"
                        control={<Radio />}
                        label="Options"
                      />
                    </RadioGroup>
                  </Box>

                  {!changeStateOption ? null : changeStateOption !==
                    "options" ? (
                    <>
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
                              errors.base_price
                                ? errors.base_price.message
                                : null
                            }
                            inputProps={{ min: 1 }}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="total_quantity"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="number"
                            label="Quantity"
                            error={!!errors.total_quantity}
                            helperText={
                              errors.total_quantity
                                ? errors.total_quantity.message
                                : null
                            }
                            inputProps={{ min: 1 }}
                          />
                        )}
                      />
                    </>
                  ) : (
                    <>
                      <Paper elevation={3}>
                        <Box padding={1}>
                          <Controller
                            control={control}
                            name="options.options_name"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                color="primary"
                                size="small"
                                label="Product name"
                                // error={!!errors.options.options_name}
                                // helperText={
                                //   errors.products_name
                                //     ? errors.options.options_name.message
                                //     : null
                                // }
                              />
                            )}
                          />
                        </Box>
                        <OptionComponent
                          data={methods.watch("options") || {}}
                          onSave={(data: any) => handleSave(data)}
                          onDelete={(data: any) =>
                            methods.setValue("options.types", [...data])
                          }
                        />
                      </Paper>
                    </>
                  )}

                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <TextareaAutosize {...field} minRows={10} />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Create
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      type="reset"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>
    </FormProvider>
  );
};

export default ProductsForm;
