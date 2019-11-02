import React from "react";

import { getStatus } from "@sotah-inc/client/build/dist/api/data";
// tslint:disable-next-line:max-line-length
import { RegionRouteContainer } from "@sotah-inc/client/build/dist/route-containers/entry-point/Region";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { IStatusRealm } from "@sotah-inc/core";
import { NextPageContext } from "next";

interface IInitialProps {
  realms: IStatusRealm[] | null;
}

export function Region({ realms: _realms }: Readonly<IInitialProps>) {
  return <RegionRouteContainer />;
}

Region.getInitialProps = async ({ query }: NextPageContext): Promise<IInitialProps> => {
  return {
    realms: await getStatus(extractString("region_name", query)),
  };
};

export default Region;
