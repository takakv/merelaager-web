import { Fragment } from "react";

interface EmailProps {
  username: string;
}

export default function ({ username }: EmailProps) {
  return (
    <Fragment>
      {username}@<span style={{ display: "none" }}>ignoreme-</span>merelaager.ee
    </Fragment>
  );
}
