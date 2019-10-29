import React from "react";

import { ILoadRootEntrypoint } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getPing, getPosts, IGetPostsResult } from "@sotah-inc/client/build/dist/api/data";
import { InitContainer } from "@sotah-inc/client/build/dist/containers/entry-point/util/Init";
import { NewsRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/News";
import { NextPageContext } from "next";

interface IInitialProps {
  rootEntrypointData?: ILoadRootEntrypoint;
  posts?: IGetPostsResult;
}

export function Content({ rootEntrypointData }: Readonly<IInitialProps>) {
  return (
    <InitContainer rootEntrypointData={rootEntrypointData}>
      <NewsRouteContainer />
    </InitContainer>
  );
}

Content.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  return {
    posts: await getPosts(),
    rootEntrypointData: { boot: await getBoot(), ping: await getPing() },
  };
};

export default Content;
