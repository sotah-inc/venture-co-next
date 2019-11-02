import React from "react";

import { getPost } from "@sotah-inc/client/build/dist/api/posts";
// tslint:disable-next-line:max-line-length
import { PostRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Content/Post";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { IGetPostResponse } from "@sotah-inc/core";
import { NextPageContext } from "next";

interface IInitialProps {
  post: IGetPostResponse | null;
}

export function Creator({ post: _post }: Readonly<IInitialProps>) {
  return <PostRouteContainer />;
}

Creator.getInitialProps = async ({ query }: NextPageContext): Promise<IInitialProps> => {
  return {
    post: await getPost(extractString("post_slug", query)),
  };
};

export default Creator;
