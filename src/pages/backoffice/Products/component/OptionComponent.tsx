import React, { useEffect, useRef, useState } from "react";
import ModalOptionForm from "./ModalOptionForm";
import {
  Box,
  Button,
  Grid,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogConfirm from "./DialogConfirm";

type OptionComponentProps = {
  data: any;
  onSave: (data: any) => void;
  onDelete: (data: any) => void;
};

const OptionComponent: React.FC<OptionComponentProps> = ({
  data,
  onSave,
  onDelete,
}) => {
  const [list, setList] = useState<any[]>([]);
  const [openModalOptions, setOpenModalOptions] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.types) {
      const types = data.types.map((type: any, i: number) => ({
        ...type,
        index: i + 1,
      }));
      setList(types);
    } else {
      setList([]);
    }
  }, [data?.types]);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index || 0);
    setOpenModalOptions(true);
  };

  const typesRef = useRef<any>({});

  const handleOpenDialog = (data: any) => {
    typesRef.current = data;
    setOpenDialog(true);
  };

  const handleDelete = (index: any) => {
    if (index) {
      const updatedList = list.map((type: any) => {
        if (type.index === index) {
          return {
            ...type,
            deleted: true,
          };
        }
        return type;
      });

      onDelete(updatedList);
      setOpenDialog(false);
    }
  };

  return (
    <Paper elevation={3}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: "1rem",
        }}
      >
        <Typography>Options</Typography>
        <Button
          size="small"
          variant="text"
          onClick={() => handleOpenModal(list?.length || 0)}
        >
          <AddCircleOutlineIcon />
        </Button>
      </Stack>
      <ModalOptionForm
        open={openModalOptions}
        onClose={() => setOpenModalOptions(!open)}
        onSave={(data) => onSave(data)}
        initialData={selectedIndex !== null ? list?.[selectedIndex] : {}}
        index={selectedIndex || 0}
      />

      {list?.filter((type: any) => type.deleted !== true).length === 0 ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingBottom={2}
        >
          <Typography variant="body2">No types available</Typography>
        </Stack>
      ) : (
        list
          ?.filter((type: any) => type.deleted !== true)
          ?.map((type: any, i: number) => (
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              key={type.index} // ควรใช้ key ที่ไม่ซ้ำเพื่อช่วยในการรีเรนเดอร์
            >
              <Grid item xs={10}>
                <ListItemButton onClick={() => handleOpenModal(i)}>
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"end"}
                    spacing={1}
                    padding={2}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      width={"100%"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 3,
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src="" // อย่าลืมเปลี่ยนเป็น URL รูปภาพจริง
                          style={{
                            maxWidth: "25px",
                            maxHeight: "25px",
                          }}
                        />
                      </Box>
                      <Stack direction={"row"} spacing={2}>
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={type?.type_name}
                        >
                          {type?.type_name}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={`Quantity ${type?.quantity}`}
                        >
                          {`Quantity ${type?.quantity}`}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={`Price ${type?.price} bath`}
                        >
                          {`Price ${type?.price} bath`}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </ListItemButton>
              </Grid>
              <Grid item xs={2}>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => handleOpenDialog(type)}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          ))
      )}
      <DialogConfirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onClick={() => handleDelete(typesRef?.current?.index)}
        title={"Are you sure"}
        message={`Are you sure you want to delete this ${typesRef?.current?.type_name}?`}
      />
    </Paper>
  );
};

export default OptionComponent;
