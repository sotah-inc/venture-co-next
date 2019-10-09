import React from "react";

import { LoadGetBoot } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getStatus } from "@sotah-inc/client/build/dist/api/data";
import { runners } from "@sotah-inc/client/build/dist/reducers/handlers";
// tslint:disable-next-line:max-line-length
import { RegionRouteContainer } from "@sotah-inc/client/build/dist/route-containers/App/Data/Region";
import { defaultMainState, IStoreState } from "@sotah-inc/client/build/dist/types";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { IGetBootResponse, IStatusRealm, RegionName } from "@sotah-inc/core";
import { NextPageContext } from "next";

import { Layout } from "../../components/Layout";

interface IInitialProps {
  data?: {
    regionName: RegionName;
    boot: IGetBootResponse | null;
    realms: IStatusRealm[] | null;
  };
}

export function Region({ data }: Readonly<IInitialProps>) {
  const predefinedState: Partial<IStoreState> | undefined = (() => {
    if (typeof data === "undefined") {
      return;
    }

    return {
      Main: runners.main(
        defaultMainState,
        LoadGetBoot({
          boot: data.boot,
          realms: data.realms,
          regionName: data.regionName,
        }),
      ),
    };
  })();

  return (
    <Layout title="Secrets of the Auction House" predefinedState={predefinedState}>
      <RegionRouteContainer />
    </Layout>
  );
}

Region.getInitialProps = async ({ req, query }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  const regionName = extractString("region_name", query);

  const [boot, realms] = await Promise.all([getBoot(), getStatus(regionName)]);

  return {
    data: {
      boot,
      realms,
      regionName,
    },
  };
};

export default Region;
