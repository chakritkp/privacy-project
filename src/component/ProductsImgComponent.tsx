import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Paper, Stack, Typography } from "@mui/material";

type ProductsImgComponentProps = {
  images: string[];
  showNav?: boolean;
};

const ProductsImgComponent: React.FC<ProductsImgComponentProps> = ({
  images,
  showNav,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={100}
          slidesPerView={1}
          navigation={showNav || false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {images?.map((src, i) => (
            <SwiperSlide key={i}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  maxWidth: "350px",
                  maxHeight: "350px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={src}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  alt={`Slide ${i + 1}`}
                />
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No images available
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ProductsImgComponent;
