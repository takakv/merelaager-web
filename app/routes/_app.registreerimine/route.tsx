import type { ActionFunctionArgs, MetaDescriptor, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

import Email from "~/components/email";

import { RegistrationSection } from "~/routes/_app.registreerimine/registration";
import { formAction } from "~/routes/_app.registreerimine/action";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.REGISTREERIMINE,
    "/registreerimine"
  ) as MetaDescriptor[];
};

export const loader = async () => {
  const shifts = await prisma.shiftInfo.findMany({
    select: {
      id: true,
      bossEmail: true,
      bossPhone: true,
      boySlots: true,
      girlSlots: true
    }
  });

  const registrationCounts: { [shiftNr: number]: { M: number; F: number } } =
    {};
  shifts.forEach((shift) => {
    registrationCounts[shift.id] = { M: shift.boySlots, F: shift.girlSlots };
  });

  const registrations = await prisma.registration.findMany({
    where: {
      isRegistered: true
    },
    select: {
      shiftNr: true,
      children: {
        select: {
          gender: true
        }
      }
    }
  });

  registrations.forEach((registration) => {
    registrationCounts[registration.shiftNr][registration.children.gender] -= 1;
  });

  return json({
    shifts,
    registrationCounts
  });
};

const RefsSection = () => {
  return (
    <section className="c-section">
      <div className="o-container">
        <h3 className="c-section-heading">Viited</h3>
        <ul className="o-grid u-list-blank u-text-center">
          <li className="c-link-card">
            <Link to="/info/vahetused/">Vahetused ja broneerimine</Link>
          </li>
          <li className="c-link-card">
            <Link to="/info/maksmine/">Hinnad ja maksmine</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

interface FreeSpaceCardProps {
  shiftNr: number;
  username: string;
  phone: string;
  freeBoySlots: number;
  freeGirlSlots: number;
}

const FreeSpaceCard = ({
                         shiftNr,
                         username,
                         phone,
                         freeBoySlots,
                         freeGirlSlots
                       }: FreeSpaceCardProps) => {
  return (
    <div className="c-regfree">
      <h4 className="u-text-center">{shiftNr}. vahetus</h4>
      <div className="c-counters">
        <p>Poisid: {freeBoySlots < 0 ? 0 : freeBoySlots}</p>
        <p>Tüdrukud: {freeGirlSlots < 0 ? 0 : freeGirlSlots}</p>
      </div>
      <div className="vahetused-info u-text-center">
        <p>
          <Email username={username} />
        </p>
        <p>{phone}</p>
      </div>
    </div>
  );
};

const FreeSpaceSection = () => {
  const { shifts, registrationCounts } = useLoaderData<typeof loader>();

  const freeSpaceCards = shifts.map((shift) => {
    const shiftNr = shift.id;
    return (
      <FreeSpaceCard
        key={shiftNr}
        shiftNr={shiftNr}
        username={shift.bossEmail.split("@")[0]}
        phone={shift.bossPhone}
        freeBoySlots={registrationCounts[shiftNr].M}
        freeGirlSlots={registrationCounts[shiftNr].F}
      />
    );
  });

  return (
    <section className="c-section">
      <div className="o-container">
        <h3 className="c-section-heading">Vabad kohad</h3>
        <div className="c-regfree__wrapper">{freeSpaceCards}</div>
      </div>
    </section>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await formAction(await request.formData());
};

export default function RegistrationRoute() {
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <RefsSection />
      <RegistrationSection />
    </main>
  );
}
