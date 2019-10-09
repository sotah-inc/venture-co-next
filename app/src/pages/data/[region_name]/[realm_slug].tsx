import React from "react";

import { LoadGetBoot } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot, getStatus } from "@sotah-inc/client/build/dist/api/data";
import { runners } from "@sotah-inc/client/build/dist/reducers/handlers";
import { RealmRouteContainer } from "@sotah-inc/client/build/dist/route-containers/App/Data/Realm";
import { defaultMainState, IStoreState } from "@sotah-inc/client/build/dist/types";
import { extractString } from "@sotah-inc/client/build/dist/util";
import { IGetBootResponse, IStatusRealm, RealmSlug, RegionName } from "@sotah-inc/core";
import { NextPageContext } from "next";

import { Layout } from "../../../components/Layout";

interface IInitialProps {
  data?: {
    regionName: RegionName;
    realmSlug: RealmSlug;
    boot: IGetBootResponse | null;
    realms: IStatusRealm[] | null;
  };
}

export function Realm({ data }: Readonly<IInitialProps>) {
  const predefinedState: Partial<IStoreState> | undefined = (() => {
    if (typeof data === "undefined") {
      return;
    }

    return {
      Main: runners.main(
        defaultMainState,
        LoadGetBoot({
          boot: data.boot,
          realmSlug: data.realmSlug,
          realms: data.realms,
          regionName: data.regionName,
        }),
      ),
    };
  })();

  return (
    <Layout title="Secrets of the Auction House" predefinedState={predefinedState}>
      <RealmRouteContainer />
    </Layout>
  );
}

Realm.getInitialProps = async ({ req, query }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  const regionName = extractString("region_name", query);
  const realmSlug = extractString("realm_slug", query);

  const [boot, realms] = await Promise.all([getBoot(), getStatus(regionName)]);

  return {
    data: {
      boot,
      realmSlug,
      realms,
      regionName,
    },
  };
};

export default Realm;
