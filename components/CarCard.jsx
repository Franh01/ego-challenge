import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export const CarCard = ({ id, name, thumbnail: img, price, year, clicked }) => {
  price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  const router = useRouter();
  return (
    // <Link href={`/model/${id}`}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "382px",
        position: "relative",
        margin: "22px",
        justifyContent: "center",
      }}
    >
      <Typography
        fontFamily={"inherit"}
        fontSize={28}
        fontWeight={600}
        lineHeight={1.07}
        letterSpacing={-0.65}
        // color={clicked ? "#eb0a1e" : "#000000"}
        color={clicked ? "var(--cherryRed)" : "#000000"}
        mb={1}
      >
        {name}
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          fontFamily={"inherit"}
          fontSize={14}
          fontWeight={"normal"}
          letterSpacing={-0.28}
          color={"#191919"}
        >{`${year} | $ ${price}`}</Typography>
      </Box>
      <Box
        sx={{
          width: "300px",
          height: "225px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img}></img>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 50,
          transition: "220ms",
          opacity: clicked ? 1 : 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--darkBtn)",
            borderRadius: "100px",
            textTransform: "none",
            padding: "8px 40px",
            transition: "300ms",
            "&:hover": {
              transition: "300ms",
              backgroundColor: "var(--cherryRed)",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => router.push(`/models/${id}`)}
        >
          <Typography
            fontFamily="inherit"
            fontSize={14}
            fontWeight={500}
            letterSpacing={0.2}
          >
            Ver Modelo
          </Typography>
        </Button>
      </Box>
    </Box>
    // </Link>
  );
};
