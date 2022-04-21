import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

export const Carousel = ({ car }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={isSmall ? 1 : isMedium ? 2 : 3}
      loop={true}
    >
      {car.model_features.map((feat, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={feat.image}
              alt={feat.name}
              style={{
                borderRadius: "6px",
                width: "100%",
                maxWidth: "330px",
              }}
            />
            <Box
              sx={{
                maxWidth: "330px",
              }}
            >
              <Typography
                fontFamily="inherit"
                variant="h2"
                fontSize={20}
                fontWeight={600}
                lineHeight={1.35}
                letterSpacing={-0.4}
                color="#373737"
                minHeight={55}
              >
                {feat.name}
              </Typography>
              <Typography
                fontFamily={["inherit"]}
                fontSize={16}
                lineHeight={1.69}
                letterSpacing={-0.1}
                color="#373737"
              >
                {feat.description}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
