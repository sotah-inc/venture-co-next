import React from "react";

import { ILoadRegionEntrypoint } from "@sotah-inc/client/build/dist/actions/main";
import { getStatus } from "@sotah-inc/client/build/dist/api/data";
// tslint:disable-next-line:max-line-length
import { RegionRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Region";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { NextPageContext } from "next";

interface IInitialProps {
  payload: ILoadRegionEntrypoint;
}

export function Region({ payload }: Readonly<IInitialProps>) {
  return <RegionRouteContainer regionEntrypointData={payload} />;
}

Region.getInitialProps = async ({ query }: NextPageContext): Promise<IInitialProps> => {
  const nextRegionName = extractString("region_name", query);

  return {
    payload: {
      nextRegionName,
      realms: await getStatus(nextRegionName),
    },
  };
};

export default Region;
