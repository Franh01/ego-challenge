import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { useCarsContext } from "./Provider";

export const CarsRender = () => {
  const { cars } = useCarsContext();
  const [clicked, setClicked] = React.useState(null);
  const [category, setCategory] = React.useState("Todos");
  const [sortedBy, setSortedBy] = React.useState("Unsorted");

  const chipsArr = [
    {
      name: "Todos",
      label: "Todos",
    },
    {
      name: "Sedan",
      label: "Sedan",
    },
    {
      name: "Hatchback",
      label: "Hatchback",
    },
    {
      name: "Pickups y Comerciales",
      label: "Pickups y Comerciales",
    },
    {
      name: "SUVs",
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
    category === "Todos"
      ? setCarsRendered(cars)
      : setCarsRendered(cars.filter((car) => car.segment === category));
  }, [category]);

  useEffect(() => {
    if (sortedBy === "") {
      setCarsRendered(cars);
    } else if (sortedBy === "Menor precio") {
      setCarsRendered(cars.sort((a, b) => a.price - b.price));
    } else if (sortedBy === "Mayor precio") {
      setCarsRendered(cars.sort((a, b) => b.price - a.price));
    } else if (sortedBy === "Menos reciente") {
      setCarsRendered(cars.sort((a, b) => a.year - b.year));
    } else if (sortedBy === "Más reciente") {
      setCarsRendered(cars.sort((a, b) => b.year - a.year));
    }
  }, [sortedBy]);
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
                onClick={() => setCategory(chip.name)}
                sx={{
                  margin: "0px 10px",
                  backgroundColor:
                    category === chip.name ? "#f7f7f7" : "transparent",
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
          <Select
            variant="standard"
            value={sortedBy}
            onChange={(e) => setSortedBy(e.target.value)}
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
