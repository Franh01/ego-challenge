import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const CarDetails = ({ car }) => {
  return (
    <Box>
      {car.hasOwnProperty("name") ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <img src={car.photo} alt={car.name} />
            </Box>
            <Box maxWidth={475}>
              <Typography
                fontFamily="inherit"
                variant="h2"
                fontSize={20}
                fontWeight={600}
                lineHeight={1.35}
                color="#373737"
              >
                {car.name}
              </Typography>
              <Typography
                fontFamily="inherit"
                variant="h2"
                fontSize={50}
                fontWeight={600}
                lineHeight={1.14}
                letterSpacing={-1}
                color="#373737"
              >
                {car.title}
              </Typography>
              <Box
                dangerouslySetInnerHTML={{
                  __html: car.description,
                }}
              ></Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            {car.model_features?.map((feat, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      maxWidth: "268px",
                    }}
                  >
                    <img
                      src={feat.image}
                      alt={feat.name}
                      style={{
                        width: "270px",
                        height: "146px",
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                    />
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
                </Grid>
              );
            })}
          </Grid>
          <Divider
            sx={{
              mb: "105px",
              mt: "50px",
            }}
          ></Divider>
          <Box>
            {car.model_highlights?.map((feat, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    mb: "55px",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      fontFamily="inherit"
                      variant="h2"
                      fontSize={20}
                      fontWeight={600}
                      lineHeight={1.35}
                      color="#373737"
                      letterSpacing={-0.4}
                      textAlign="left"
                    >
                      {feat.title}
                    </Typography>
                    <Box
                      sx={{
                        fontFamily: "inherit",
                        fontSize: 16,
                        lineHeight: 1.69,
                        letterSpacing: -0.1,
                        color: "#373737",
                        maxWidth: "385px",
                        textAlign: "left",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: feat.content,
                      }}
                    ></Box>
                  </Box>
                  <img
                    src={feat.image}
                    alt={feat.title}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h1">Not found</Typography>
        </Box>
      )}
    </Box>
  );
};
