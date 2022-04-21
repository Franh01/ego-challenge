import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { useCarsContext } from "./Provider";

export const CarsRender = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { cars } = useCarsContext();
  const [clicked, setClicked] = React.useState(null);
  const [category, setCategory] = React.useState("Todos");
  const [sortedBy, setSortedBy] = React.useState("Unsorted");

  const chipsArr = [
    {
      value: "Todos",
      label: "Todos",
    },
    {
      value: "Sedan",
      label: "Sedan",
    },
    {
      value: "Hatchback",
      label: "Hatchback",
    },
    {
      value: "Pickups y Comerciales",
      label: "Pickups y Comerciales",
    },
    {
      value: "SUVs",
      label: "SUVs",
    },
  ];
  const sortedArr = [
    {
      value: "Unsorted",
      label: "Ordenar por:",
    },
    {
      value: "Menor precio",
      label: "De menor a mayor precio",
    },
    {
      value: "Mayor precio",
      label: "De mayor a menor precio",
    },
    {
      value: "Menos reciente",
      label: "Más viejos primero",
    },
    {
      value: "Más reciente",
      label: "Más nuevos primero",
    },
  ];
  const [carsRendered, setCarsRendered] = useState(cars);
  useEffect(() => {
    setSortedBy("Unsorted");
    category === "Todos"
      ? setCarsRendered(cars)
      : setCarsRendered(cars.filter((car) => car.segment === category));
  }, [category]);

  const handleSort = (e) => {
    setSortedBy(e);
    if (e === "") {
      setCarsRendered(carsRendered);
    } else if (e === "Menor precio") {
      setCarsRendered(carsRendered.sort((a, b) => a.price - b.price));
    } else if (e === "Mayor precio") {
      setCarsRendered(carsRendered.sort((a, b) => b.price - a.price));
    } else if (e === "Menos reciente") {
      setCarsRendered(carsRendered.sort((a, b) => a.year - b.year));
    } else if (e === "Más reciente") {
      setCarsRendered(carsRendered.sort((a, b) => b.year - a.year));
    }
  };

  const handleSelectCategory = (e) => {
    setCategory(e);
    e === "Todos"
      ? setCarsRendered(cars)
      : setCarsRendered(cars.filter((car) => car.segment === e));
  };

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isMobile ? (
            <Box display="flex" alignItems="center">
              <Typography
                fontFamily={"inherit"}
                fontSize={14}
                fontWeight={600}
                lineHeight={1}
                letterSpacing={0.08}
                color={"#373737"}
              >
                Filtrar por:
              </Typography>
              {chipsArr.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip.label}
                  onClick={() => setCategory(chip.value)}
                  sx={{
                    margin: "0px 10px",
                    backgroundColor:
                      category === chip.value ? "#f7f7f7" : "transparent",
                    fontFamily: "inherit",
                    fontSize: 14,
                    fontWeight: "normal",
                    lineHeight: 1,
                    letterSpacing: 0.08,
                    color: "#373737",
                  }}
                />
              ))}
            </Box>
          ) : (
            <Select
              variant="standard"
              value={category}
              onChange={(e) => handleSelectCategory(e.target.value)}
              sx={{
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: "normal",
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: 0.08,
                color: "#373737",
                "&:after": {
                  borderBottom: "none",
                },
                "&:before": {
                  borderBottom: "none",
                  content: "none",
                },
                "& .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                  {
                    paddingTop: "9px",
                  },
              }}
            >
              {chipsArr.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  sx={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    fontWeight: "normal",
                    lineHeight: 1,
                    letterSpacing: 0.08,
                    color: "#373737",
                    padding: "15px 30px",
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
          <Select
            variant="standard"
            value={sortedBy}
            onChange={(e) => handleSort(e.target.value)}
            sx={{
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: "normal",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.08,
              color: "#373737",
              "&:after": {
                borderBottom: "none",
              },
              "&:before": {
                borderBottom: "none",
                content: "none",
              },
              "& .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  paddingTop: "9px",
                },
            }}
          >
            {sortedArr.map((option, index) => (
              <MenuItem
                key={index}
                value={option.value}
                sx={{
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: "normal",
                  lineHeight: 1,
                  letterSpacing: 0.08,
                  color: "#373737",
                  padding: "15px 30px",
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Divider
        sx={{
          margin: "9px 0px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {carsRendered.map((car, index) => {
          return (
            <Box
              onMouseOver={() => setClicked(index)}
              onMouseOut={() => setClicked(null)}
              key={index}
            >
              <CarCard clicked={index === clicked} {...car} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
