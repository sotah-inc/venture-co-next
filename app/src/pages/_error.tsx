import React from "react";

import { NotFound } from "@sotah-inc/client/build/dist/components/util/NotFound";
import HttpStatus from "http-status";

interface IOwnProps {
  statusCode?: number;
}

type Props = Readonly<IOwnProps>;

class Error extends React.Component<Props> {
  public static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  public render() {
    // props
    const { statusCode } = this.props;

    if (typeof statusCode === "undefined") {
      return <p>An error occurred!</p>;
    }

    switch (statusCode) {
      case HttpStatus.NOT_FOUND:
        return <NotFound />;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return <p>An internal server error occurred!</p>;
      default:
        return <p>An error {statusCode} occurred!</p>;
    }
  }
}

export default Error;
