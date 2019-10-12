import React from "react";

import { Boot, defaultState } from "@sotah-inc/client";
import "@sotah-inc/client/build/styles/venture-co.min.css";
import App from "next/app";
import Head from "next/dist/next-server/lib/head";

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Secrets of the Auction House</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <Boot viewport={<Component {...pageProps} />} predefinedState={defaultState} />
      </>
    );
  }
}

export default MyApp;
