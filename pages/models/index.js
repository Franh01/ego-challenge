import { Box } from "@mui/material";
import Head from "next/head";
import Main from "../../components/Main";
import ContextProvider from "../../components/Provider";

export default function Home({ data }) {
  return (
    <ContextProvider cars={data}>
      <Box>
        <Head>
          <title>EGO Challenge</title>
          <meta name="description" content="Ego challenge by Franh01" />
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Main />
      </Box>
    </ContextProvider>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`https://challenge.agenciaego.tech/api/models/`);
  const data = await res.json();
  return { props: { data } };
}
