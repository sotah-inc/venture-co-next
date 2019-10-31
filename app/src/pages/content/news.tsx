import React from "react";

import { getPosts, IGetPostsResult } from "@sotah-inc/client/build/dist/api/data";
import { NewsRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/News";
import { NextPageContext } from "next";

interface IInitialProps {
  posts?: IGetPostsResult;
}

export function Content({ posts: _posts }: Readonly<IInitialProps>) {
  return <NewsRouteContainer />;
}

Content.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  return {
    posts: await getPosts(),
  };
};

export default Content;
