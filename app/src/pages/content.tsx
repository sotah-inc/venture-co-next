import React from "react";

import { ILoadRootEntrypoint } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getPing } from "@sotah-inc/client/build/dist/api/data";
import { InitContainer } from "@sotah-inc/client/build/dist/containers/entry-point/util/Init";
// tslint:disable-next-line:max-line-length
import { ContentRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Content";
import { NextPageContext } from "next";

interface IInitialProps {
  rootEntrypointData?: ILoadRootEntrypoint;
}

export function Content({ rootEntrypointData }: Readonly<IInitialProps>) {
  return (
    <InitContainer rootEntrypointData={rootEntrypointData}>
      <ContentRouteContainer />
    </InitContainer>
  );
}

Content.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  return { rootEntrypointData: { boot: await getBoot(), ping: await getPing() } };
};

export default Content;
