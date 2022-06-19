import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <Head>
          <title>Etronic</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          <Navbar />
        </header>
        <main className="main-continer">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
