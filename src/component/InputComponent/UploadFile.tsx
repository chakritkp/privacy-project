import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";

type UploadFileProps = {
  name: string;
  limit: number;
};

interface PreviewImagesType {
  url: string;
  name: string;
}

const UploadFile: React.FC<UploadFileProps> = ({ name, limit }) => {
  const [previewImages, setPreviewImages] = useState<PreviewImagesType[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getValues, setValue, watch } = useFormContext();

  const imageFiles = watch(name, []);

  useEffect(() => {
    if (imageFiles?.length > 0) {
      const newPreviews = imageFiles?.map((file: any) => {
        const imageURL = URL.createObjectURL(file);
        return {
          url: imageURL,
          name: file.name,
        };
      });

      setPreviewImages(newPreviews);
    }
  }, [imageFiles]);

  const handleImages = (e: any) => {
    const files = e.target.files;

    if (!files) {
      console.error("No files selected");
      return;
    }

    const prevFiles = getValues(name) || [];

    if (
      prevFiles.length === limit ||
      files.length > limit ||
      prevFiles.length + files.length > limit
    ) {
      enqueueSnackbar(`You can only upload up to ${limit} images`, {
        variant: "error",
      });
      return;
    }
    const newImages = Array.from(files);

    setValue(name, [...prevFiles, ...newImages]);
  };

  const handleDeleteImages = (index_id: number) => {
    const prevFiles = getValues(name) || [];

    if (prevFiles.length < 1) {
      return;
    }

    const updatedFiles = [...prevFiles];
    updatedFiles.splice(index_id, 1);

    const newPreviews = updatedFiles.map((file: any) => {
      const imageURL = URL.createObjectURL(file);
      return {
        url: imageURL,
        name: file.name,
      };
    });

    setPreviewImages(newPreviews);
    setValue(name, updatedFiles);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          marginY: "1rem",
        }}
      >
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          <UploadIcon />
        </Button>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImages}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </Box>
      <Stack direction={"column"} justifyContent={"center"} spacing={1}>
        {previewImages?.map((img: PreviewImagesType, i: number) => (
          <Paper
            key={i}
            elevation={3}
            sx={{ padding: "0.5rem 1rem", height: "2rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                overflow: "hidden",
              }}
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
                  src={img?.url}
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={img?.name}
                >
                  {img?.name}
                </Typography>
              </Box>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => handleDeleteImages(i)}
              >
                <CloseIcon />
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default UploadFile;
