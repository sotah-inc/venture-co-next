import React from "react";

import { getBoot, getPing, getPosts, IGetPostsResult } from "@sotah-inc/client/build/dist/api/data";
import { NewsRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/News";
import { IGetBootResponse } from "@sotah-inc/server/build/dist/messenger/contracts";
import { NextPageContext } from "next";

interface IInitialProps {
  data?: {
    boot: IGetBootResponse | null;
    ping: boolean;
    posts: IGetPostsResult | null;
  };
}

export function Content({ data: { boot, ping } }: Readonly<IInitialProps>) {
  return <NewsRouteContainer rootEntrypointData={{ boot, ping }} />;
}

Content.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return;
  }

  return { data: { boot: await getBoot(), ping: await getPing(), posts: await getPosts() } };
};

export default Content;
