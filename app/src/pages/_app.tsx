import React from "react";

import { Boot, defaultState } from "@sotah-inc/client";
import { ILoadRootEntrypoint } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getPing } from "@sotah-inc/client/build/dist/api/data";
import "@sotah-inc/client/build/styles/venture-co.min.css";
import App, { AppContext } from "next/app";
import Head from "next/dist/next-server/lib/head";

interface IInitialProps {
  rootEntrypointData?: ILoadRootEntrypoint;
}

class MyApp extends App<Readonly<IInitialProps>> {
  public static async getInitialProps(appContext: AppContext) {
    const appProps = await App.getInitialProps(appContext);
    const {
      ctx: { req },
    } = appContext;

    if (typeof req === "undefined") {
      return appProps;
    }

    const [boot, ping] = await Promise.all([getBoot(), getPing()]);

    return { ...appProps, rootEntrypointData: { boot, ping } };
  }

  public render() {
    const { Component, pageProps, rootEntrypointData } = this.props;

    return (
      <>
        <Head>
          <title>Secrets of the Auction House</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <Boot
          rootEntrypointData={rootEntrypointData}
          viewport={<Component {...pageProps} />}
          predefinedState={defaultState}
        />
      </>
    );
  }
}

export default MyApp;
