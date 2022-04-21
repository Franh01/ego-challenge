import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Tab, Tabs, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { CarsRender } from "./CarsRender";
import { useCarsContext } from "./Provider";
import { CarDetails } from "./CarDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "70px",
  },
  tabs: {
    textTransform: "none",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: "600",
    color: "#191919",
    paddingBottom: "25px",
  },
  tabsRoot: {
    "& .css-q012sa-MuiTabs-indicator": {
      height: "4px",
    },
  },
  listItem: {
    padding: "4px 45px",
  },
  listItemText: {
    fontFamily: "inherit",
    fontSize: 18,
    fontWeight: "normal",
    letterSpacing: -0.1,
    textAlign: "right",
    color: "#000",
  },
  textStyle6: {
    fontFamily: "inherit",
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 1.14,
    letterSpacing: -1,
    color: "#373737",
  },
}));
const drawerWidth = 390;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  height: "70px",
  justifyContent: "flex-end",
}));

export default function Main() {
  const { cars } = useCarsContext();
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("models");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (cars.length > 1) {
      setValue("models");
    } else {
      setValue("detail");
    }
  }, [cars]);

  const onTabClick = () => {
    setValue("models");
    router.push("/models");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <AppBar position="fixed" open={open} color="white" elevation={1}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          classes={{
            root: classes.root,
          }}
        >
          <Box
            width={isMobile ? "100%" : "auto"}
            mr={10}
            minHeight={70}
            display="flex"
            alignItems={"center"}
          >
            <Image src="/media/icon.png" width={40} height={40}></Image>
          </Box>
          {!isMobile && (
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                textColor="primary"
                indicatorColor="primary"
                classes={{
                  root: classes.tabsRoot,
                }}
              >
                <Tab
                  className={classes.tabs}
                  value="models"
                  label="Modelos"
                  onClick={onTabClick}
                />
                <Tab
                  className={classes.tabs}
                  value="detail"
                  label="Ficha de modelo"
                />
              </Tabs>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "70px",
            }}
          >
            {!open && !isMobile && (
              <Typography
                fontFamily="inherit"
                fontSize={14}
                fontWeight="normal"
                color={"#191919"}
              >
                Menú
              </Typography>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box width={"100%"}>
        <DrawerHeader />
        <Box
          sx={{
            width: isMobile ? "90%" : "80%",
            margin: "auto",
          }}
        >
          {cars.length > 1 ? (
            <Box>
              <Box
                sx={{
                  marginTop: "85px",
                  marginBottom: "80px",
                }}
              >
                <Typography className={classes.textStyle6}>
                  Descubrí todos los modelos
                </Typography>
              </Box>
              <CarsRender />
            </Box>
          ) : (
            <CarDetails car={cars} />
          )}
        </Box>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <Typography
            fontFamily="inherit"
            fontSize={14}
            fontWeight="normal"
            color={"#191919"}
          >
            Cerrar
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          {[
            { title: "Modelos", url: "/models" },
            { title: "Servicios y Accesorios", url: "/" },
            { title: "Financiación", url: "/" },
            { title: "Reviews y Comunidad", url: "/" },
          ].map((text, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              onClick={() => router.push(text.url)}
            >
              <ListItemText
                primary={
                  <Typography className={classes.listItemText}>
                    {text.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { title: "Toyota Mobility Service", url: "/" },
            { title: "Toyota Gazoo Racing", url: "/" },
            { title: "Toyota Híbridos", url: "/" },
          ].map((text, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              onClick={() => router.push(text.url)}
            >
              <ListItemText
                primary={
                  <Typography className={classes.listItemText}>
                    {text.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { title: "Concesionarios", url: "/" },
            { title: "Test Drive", url: "/" },
            { title: "Contacto", url: "/" },
          ].map((text, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              onClick={() => router.push(text.url)}
            >
              <ListItemText
                primary={
                  <Typography className={classes.listItemText}>
                    {text.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            background: "rgba(0, 0, 0, 0.12)",
            height: "100%",
          }}
        >
          {[
            { title: "Actividades", url: "/" },
            { title: "Servicios al Cliente", url: "/" },
            { title: "Ventas Especiales", url: "/" },
            { title: "Innovación", url: "/" },
            { title: "Prensa", url: "/" },
            { title: "Acerca de...", url: "/" },
          ].map((text, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              onClick={() => router.push(text.url)}
            >
              <ListItemText
                primary={
                  <Typography className={classes.listItemText}>
                    {text.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        className="footer"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50px",
          background: "#000000",
        }}
      ></Box>
    </Box>
  );
}
