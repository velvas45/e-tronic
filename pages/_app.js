import "../styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Head>
          <link rel="icon" href="/static/logo-website.svg" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
