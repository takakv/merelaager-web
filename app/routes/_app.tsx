import { Fragment } from "react";
import { Outlet } from "@remix-run/react";

import NavBar from "~/components/nav-bar";
import Sponsors from "~/components/sponsors";
import Footer from "~/components/footer";

export default function AppWrapper() {
  return (
    <Fragment>
      <header className="c-header">
        <NavBar />
      </header>
      <Outlet />
      <Sponsors />
      <Footer />
    </Fragment>
  );
}
