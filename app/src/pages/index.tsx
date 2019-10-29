import React from "react";

import { ILoadRootEntrypoint } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getPing } from "@sotah-inc/client/build/dist/api/data";
import { InitContainer } from "@sotah-inc/client/build/dist/containers/entry-point/util/Init";
import { RootRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Root";
import { NextPageContext } from "next";

interface IInitialProps {
  rootEntrypointData?: ILoadRootEntrypoint;
}

export function Home({ rootEntrypointData }: Readonly<IInitialProps>) {
  return (
    <InitContainer rootEntrypointData={rootEntrypointData}>
      <RootRouteContainer />
    </InitContainer>
  );
}

Home.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  return { rootEntrypointData: { boot: await getBoot(), ping: await getPing() } };
};

export default Home;
