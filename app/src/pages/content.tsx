import React from "react";

import { getBoot, getPing } from "@sotah-inc/client/build/dist/api/data";
// tslint:disable-next-line:max-line-length
import { ContentRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Content";
import { IGetBootResponse } from "@sotah-inc/core";
import { NextPageContext } from "next";

interface IInitialProps {
  data?: {
    boot: IGetBootResponse | null;
    ping: boolean;
  };
}

export function Content({ data }: Readonly<IInitialProps>) {
  return <ContentRouteContainer rootEntrypointData={data} />;
}

Content.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return;
  }

  return { data: { boot: await getBoot(), ping: await getPing() } };
};

export default Content;
