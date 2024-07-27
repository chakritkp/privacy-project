import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Modal,
  Container,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFile from "../../../../component/InputComponent/UploadFile";
import { Controller, useForm } from "react-hook-form";

type ModalOptionFormProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  index?: number;
};

const ModalOptionForm: React.FC<ModalOptionFormProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  index,
}) => {
  const [changeStateOption, setChangeStateOption] = useState<string | null>(
    null
  );
  const { control, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (open) {
      reset();
    }

    if (initialData) {
      const { type_name, price, quantity, value } = initialData;
      setValue("type_name", type_name || "");
      setValue("price", price || 0);
      setValue("quantity", quantity || 0);
    }
  }, [open]);

  const handleSave = (data: any) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-loader-title"
      aria-describedby="modal-loader-description"
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <Container
          component={"main"}
          maxWidth={"sm"}
          sx={{ margin: "0.5rem", ...style }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              padding: 1,
            }}
          >
            <Button size="small" variant="text" color="error" onClick={onClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    padding: "1rem",
                  }}
                >
                  <UploadFile name={`type_image`} limit={1} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Stack direction={"column"} spacing={1} padding={1}>
                  <Controller
                    control={control}
                    name={`type_name`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Type name"
                        //   error={!!errors.options?.[0]?.type_name}
                        //   helperText={
                        //     errors.options?.[0]?.type_name
                        //       ? errors.options?.[0]?.type_name.message
                        //       : null
                        //   }
                      />
                    )}
                  />
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
                        value="no-value"
                        control={<Radio />}
                        label="No value"
                      />
                      <FormControlLabel
                        value="value"
                        control={<Radio />}
                        label="Value"
                      />
                    </RadioGroup>
                  </Box>
                  {!changeStateOption ? null : changeStateOption !== "value" ? (
                    <>
                      <Controller
                        control={control}
                        name={`price`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="number"
                            label="Price"
                            //   error={!!errors.options?.[0]?.price}
                            //   helperText={
                            //     errors.options?.[0]?.price
                            //       ? errors.options?.[0]?.price.message
                            //       : null
                            //   }
                            inputProps={{ min: 1 }}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`quantity`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="number"
                            label="Quantity"
                            //   error={!!errors.total_quantity}
                            //   helperText={
                            //     errors.total_quantity ? errors.total_quantity.message : null
                            //   }
                            inputProps={{ min: 1 }}
                          />
                        )}
                      />
                    </>
                  ) : (
                    <Stack direction={"row"}>
                      {/* <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6}>
                          <Stack
                            direction={"column"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            <UploadFile
                              name="options.value.value_image"
                              limit={1}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Stack direction={"column"} spacing={1}>
                            <Controller
                              control={control}
                              name={`value_name`}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  label="Value name"
                                  //   error={!!errors.options?.[0]?.type_name}
                                  //   helperText={
                                  //     errors.options?.[0]?.type_name
                                  //       ? errors.options?.[0]?.type_name.message
                                  //       : null
                                  //   }
                                />
                              )}
                            />
                            <Controller
                              control={control}
                              name={`value.price`}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  type="number"
                                  label="Price"
                                  //   error={!!errors.options?.[0]?.price}
                                  //   helperText={
                                  //     errors.options?.[0]?.price
                                  //       ? errors.options?.[0]?.price.message
                                  //       : null
                                  //   }
                                  inputProps={{ min: 1 }}
                                />
                              )}
                            />
                            <Controller
                              control={control}
                              name={`options.value.quantity`}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  type="number"
                                  label="Quantity"
                                  //   error={!!errors.total_quantity}
                                  //   helperText={
                                  //     errors.total_quantity ? errors.total_quantity.message : null
                                  //   }
                                  inputProps={{ min: 1 }}
                                />
                              )}
                            />
                          </Stack>
                        </Grid>
                      </Grid> */}
                    </Stack>
                  )}
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={1}
                  padding={1}
                >
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                  <Button variant="contained" color="error" onClick={onClose}>
                    Cancel
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Modal>
  );
};

export default ModalOptionForm;

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  zIndex: 1300,
};

// const Modal = styled(BaseModal)`
//   position: fixed;
//   z-index: 1300;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
