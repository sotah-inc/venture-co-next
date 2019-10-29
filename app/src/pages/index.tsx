import React from "react";

import { getBoot, getPing } from "@sotah-inc/client/build/dist/api/data";
import { RootRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Root";
import { IGetBootResponse } from "@sotah-inc/core";
import { NextPageContext } from "next";

interface IInitialProps {
  data?: {
    ping: boolean;
    boot: IGetBootResponse | null;
  };
}

export function Home({ data }: Readonly<IInitialProps>) {
  return <RootRouteContainer rootEntrypointData={data} />;
}

Home.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return;
  }

  return { data: { boot: await getBoot(), ping: await getPing() } };
};

export default Home;
