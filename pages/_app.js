import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ContextProvider from "../components/Provider";

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff",
    },
    primary: {
      main: "#d0021b",
    },
    darkBtn: {
      main: "#2c2b2c",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
