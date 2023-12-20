import type { MetaDescriptor, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StatusCodes } from "http-status-codes";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export async function loader() {
  return json(null, { status: StatusCodes.NOT_FOUND });
}

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.NOT_FOUND, "/404") as MetaDescriptor[];
};

export default function NotFound() {
  return (
    <main className="errorpage">
      <section className="site-error">
        <h3 className="">404 – kaardistamata ala</h3>
        <p>Asute tundmatutes vetes.</p>
        <Link to="/" className="c-btn c-btn--white">
          Tagasi rannikule
        </Link>
      </section>
    </main>
  );
}
