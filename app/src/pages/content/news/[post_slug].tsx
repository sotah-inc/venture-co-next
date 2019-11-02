import React from "react";

import { getPost } from "@sotah-inc/client/build/dist/api/posts";
import { PostRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Post";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { IGetPostResponse } from "@sotah-inc/core";
import { NextPageContext } from "next";

interface IInitialProps {
  post: IGetPostResponse | null;
}

export function Creator({ post }: Readonly<IInitialProps>) {
  return <PostRouteContainer postPayload={post} />;
}

Creator.getInitialProps = async ({ query }: NextPageContext): Promise<IInitialProps> => {
  return {
    post: await getPost(extractString("post_slug", query)),
  };
};

export default Creator;
