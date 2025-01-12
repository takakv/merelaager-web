import {
  ActionFunctionArgs,
  Link,
  MetaDescriptor,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router";

import { prisma } from "~/db.server";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

import Email from "~/components/email";

import { RegistrationSection } from "~/routes/registreerimine/registration";
import { formAction } from "~/routes/registreerimine/action";

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
      girlSlots: true,
      boySlotsReserve: true,
      girlSlotsReserve: true,
      startDate: true,
      length: true,
    },
  });

  const remainingSlots: { [shiftNr: number]: { M: number; F: number } } = {};
  shifts.forEach((shift) => {
    remainingSlots[shift.id] = {
      M: shift.boySlots - shift.boySlotsReserve,
      F: shift.girlSlots - shift.girlSlotsReserve,
    };
  });

  const registrations = await prisma.registration.findMany({
    where: {
      isRegistered: true,
    },
    select: {
      shiftNr: true,
      children: {
        select: {
          gender: true,
        },
      },
    },
  });

  registrations.forEach((registration) => {
    remainingSlots[registration.shiftNr][registration.children.gender] -= 1;
  });

  // Display the max number of slots, disregarding reserve, in case nobody
  // has been registered yet. This prevents confusion as to why registration
  // counters are lower than expected at the start of the registration period.
  shifts.forEach((shift) => {
    const maxFreeBoySlots = shift.boySlots - shift.boySlotsReserve;
    const maxFreeGirlSlots = shift.girlSlots - shift.girlSlotsReserve;
    if (
      remainingSlots[shift.id].M >= 0 &&
      remainingSlots[shift.id].M === maxFreeBoySlots
    ) {
      remainingSlots[shift.id].M = shift.boySlots;
    }
    if (
      remainingSlots[shift.id].F >= 0 &&
      remainingSlots[shift.id].F === maxFreeGirlSlots
    ) {
      remainingSlots[shift.id].F = shift.girlSlots;
    }
  });

  return {
    shifts,
    remainingSlots,
    currentTime: Date.now(),
  };
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
  freeGirlSlots,
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
  const { shifts, remainingSlots } = useLoaderData<typeof loader>();

  const freeSpaceCards = shifts.map((shift) => {
    const shiftNr = shift.id;
    return (
      <FreeSpaceCard
        key={shiftNr}
        shiftNr={shiftNr}
        username={shift.bossEmail.split("@")[0]}
        phone={shift.bossPhone}
        freeBoySlots={remainingSlots[shiftNr].M}
        freeGirlSlots={remainingSlots[shiftNr].F}
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
  const res = await formAction(await request.formData());
  if (res === null) return redirect("/registreermine/edu");
  return res;
};

export default function RegistrationRoute() {
  const actionData = useActionData<typeof action>();
  const errors = actionData?.errors;
  if (errors) {
    console.log(errors);
  }
  /*
  useEffect(() => {
    if (!actionData || actionData.ok) return;

    alert(`Registreerimine ei õnnestunud.\n\nPõhjus: ${actionData.message}`);
  }, [actionData]);
  */

  return (
    <main>
      <RefsSection />
      <FreeSpaceSection />
      <RegistrationSection errors={errors} />
    </main>
  );
}
