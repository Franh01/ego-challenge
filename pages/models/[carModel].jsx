import { Box } from "@mui/material";
import Head from "next/head";
import PersistentDrawerRight from "../../components/Drawer";
import ContextProvider from "../../components/Provider";

export default function CarDetail({ data }) {
  return (
    <ContextProvider cars={data}>
      <Box>
        <Head>
          <title>{data.name || "Not found"}</title>
          <meta name="description" content="Ego challenge by Franh01" />
          <link rel="icon" href="favicon.ico" />
        </Head>
        <PersistentDrawerRight />
      </Box>
    </ContextProvider>
  );
}

export async function getServerSideProps(ctx) {
  const { carModel } = ctx.query;
  const res = await fetch(
    `https://challenge.agenciaego.tech/api/models/${carModel}`
  );
  const data = await res.json();
  return { props: { data } };
}
