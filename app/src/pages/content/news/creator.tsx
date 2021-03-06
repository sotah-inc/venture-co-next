import React from "react";

import { ReceiveGetBoot, ReceiveGetPing } from "@sotah-inc/client/build/dist/actions/main";
import { getBoot } from "@sotah-inc/client/build/dist/api/data";
import { runners } from "@sotah-inc/client/build/dist/reducers/handlers";
// tslint:disable-next-line:max-line-length
import { NewsCreatorRouteContainer } from "@sotah-inc/client/build/dist/route-containers/App/Content/NewsCreator";
import { defaultMainState, IStoreState } from "@sotah-inc/client/build/dist/types";
import { IGetBootResponse } from "@sotah-inc/server/build/dist/messenger/contracts";
import { NextPageContext } from "next";

import { Layout } from "../../../components/Layout";

interface IInitialProps {
  data?: {
    boot: IGetBootResponse | null;
  };
}

export function Creator({ data }: Readonly<IInitialProps>) {
  const predefinedState: Partial<IStoreState> | undefined = (() => {
    if (typeof data === "undefined") {
      return;
    }

    return {
      Main: runners.main(
        runners.main(defaultMainState, ReceiveGetPing(true)),
        ReceiveGetBoot(data.boot),
      ),
    };
  })();

  return (
    <Layout title="Secrets of the Auction House" predefinedState={predefinedState}>
      <NewsCreatorRouteContainer />
    </Layout>
  );
}

Creator.getInitialProps = async ({ req }: NextPageContext): Promise<IInitialProps> => {
  if (typeof req === "undefined") {
    return {};
  }

  return { data: { boot: await getBoot() } };
};

export default Creator;
