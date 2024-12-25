import { Link, useLoaderData } from "react-router";
import type { ReactElement } from "react";
import { Fragment } from "react";
import type { MetaDescriptor, MetaFunction } from "react-router";

import Email from "~/components/email";
import { InfoBanner, WarningBanner } from "~/components/banners";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

import { prisma } from "~/db.server";

import type { ShiftInfo } from "~/hcdb";
import { YEAR } from "~/hcdb";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.INFO_VAHETUSED,
    "/info/vahetused"
  ) as MetaDescriptor[];
};

const InfoCard = (props: ShiftInfo) => {
  const numerals = ["I", "II", "III", "IV", "V"];

  const endDate = new Date(props.shiftStartDate);
  // Subtract one to avoid overflowing into an extra day.
  endDate.setDate(endDate.getDate() + props.shiftLen - 1);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit"
  };

  const startDateStr = props.shiftStartDate.toLocaleDateString(
    "et",
    dateOptions
  );
  const endDateStr = endDate.toLocaleDateString("et", dateOptions);

  return (
    <div className="c-shift-card">
      <div className="c-details__header">
        {numerals[props.shiftNr - 1]} vahetus<span className="u-wave"></span>
        {startDateStr}-{endDateStr}
        <span className="u-wave"></span>
        {props.shiftLen} päeva
      </div>
      <div className="details-contact">
        <p>
          <b>{props.name}</b>
        </p>
        <p>
          <Email username={props.username} />
        </p>
        <p>{props.phone}</p>
      </div>
      {/*<div class="contact__free"><div class="count">-</div></div>*/}
    </div>
  );
};

interface ShiftInfoProps {
  shifts: ShiftInfo[];
}

const ShiftInfoComponent = ({ shifts }: ShiftInfoProps) => {
  const infoCards = shifts.map((shift) => (
    <InfoCard
      key={shift.shiftNr}
      shiftNr={shift.shiftNr}
      name={shift.name}
      username={shift.username}
      phone={shift.phone}
      shiftLen={shift.shiftLen}
      shiftStartDate={shift.shiftStartDate}
    />
  ));
  return (
    <Fragment>
      <div className="c-details o-grid">{infoCards}</div>
      <InfoBanner>
        Vabade kohtade puudumisel soovitame registreeruda reservnimekirja. Kui
        põhinimekirjas koht vabaneb, võtame teiega esimesel võimalusel ühendust.
      </InfoBanner>
    </Fragment>
  );
};

interface ActiveDay {
  startDay: number;
  endDay: number;
  isLight: boolean;
  isTrueStart: boolean;
}

interface CalendarMonthProps {
  monthIndex: number;
  activeDays: ActiveDay[];
}

const CalendarMonth = ({ monthIndex, activeDays }: CalendarMonthProps) => {
  const monthDate = new Date(YEAR, monthIndex + 1, 0);
  const monthName = monthDate.toLocaleDateString("et", {
    month: "long"
  });

  const daysInMonth = monthDate.getDate();
  monthDate.setDate(monthDate.getDate() - daysInMonth + 1);
  // Get the weekday index of the first day in the month. Subtract one to get
  // the difference of days with "Monday", when the calendar starts.
  const underflowDays = monthDate.getDay() - 1;

  const underflowDayEls: ReactElement[] = [];
  for (let i = 0; i < underflowDays; ++i) {
    underflowDayEls.push(<div key={i} />);
  }

  let cssClass = "";
  let spanDaysRemaining = 0;

  const dayEls: ReactElement[] = [];
  for (let i = 1; i <= daysInMonth; ++i) {
    if (spanDaysRemaining === 0) cssClass = "not";
    else spanDaysRemaining -= 1;

    const el = activeDays.find((el) => el.startDay === i);

    if (el !== undefined) {
      cssClass = el.isLight ? "lite" : "";
      spanDaysRemaining = el.endDay - el.startDay;

      if (el.isTrueStart) {
        dayEls.push(
          <div key={i} className={cssClass + " start"}>
            {i}
          </div>
        );
        continue;
      }
    }

    dayEls.push(
      <div key={i} className={cssClass}>
        {i}
      </div>
    );
  }

  return (
    <div className="month">
      <h4 className="month__name">{monthName}</h4>
      <div className="month__calendar">
        <div>E</div>
        <div>T</div>
        <div>K</div>
        <div>N</div>
        <div>R</div>
        <div>L</div>
        <div>P</div>
        {underflowDayEls}
        {dayEls}
      </div>
    </div>
  );
};

interface ShiftInfoProps {
  shifts: ShiftInfo[];
}

const CalendarsComponent = ({ shifts }: ShiftInfoProps) => {
  const activeSpans: CalendarMonthProps[] = [];

  // Get the months for every active shift.
  shifts.forEach((shift) => {
    const shiftMonthIndex = shift.shiftStartDate.getMonth();
    if (activeSpans.some((el) => el.monthIndex === shiftMonthIndex)) return;
    activeSpans.push({
      monthIndex: shiftMonthIndex,
      activeDays: []
    });
  });

  let spanIsLight = true;
  let spanDaysRemaining = 0;

  shifts.forEach((shift) => {
    const month = shift.shiftStartDate.getMonth();
    const startDay = shift.shiftStartDate.getDate();
    const daysInMonth = new Date(YEAR, month + 1, 0).getDate();

    const arrayIndex = activeSpans.findIndex((el) => el.monthIndex === month);

    // Deal with the days that overflowed from the past month.
    // The first day of the month is not the true shift start,
    // so make not of it, to avoid marking it as a shift start.
    if (spanDaysRemaining !== 0) {
      activeSpans[arrayIndex].activeDays.push({
        startDay: 1,
        endDay: spanDaysRemaining,
        isLight: spanIsLight,
        isTrueStart: false
      });
      spanDaysRemaining = 0;
      // Switch the colours for the next shift.
      spanIsLight = !spanIsLight;
    }

    let switchColours = true;

    let endDay = startDay + shift.shiftLen - 1;
    if (endDay > daysInMonth) {
      spanDaysRemaining = endDay - daysInMonth;
      endDay = daysInMonth;
      switchColours = false;
    }

    activeSpans[arrayIndex].activeDays.push({
      startDay,
      endDay,
      isLight: spanIsLight,
      isTrueStart: true
    });

    // Do not switch the colours yet, if there is an overflow into the next shift.
    if (switchColours) spanIsLight = !spanIsLight;
  });

  const calendarMonths = activeSpans.map((el) => (
    <CalendarMonth
      key={el.monthIndex}
      monthIndex={el.monthIndex}
      activeDays={el.activeDays}
    />
  ));

  return (
    <Fragment>
      <div className="c-schedule">{calendarMonths}</div>
    </Fragment>
  );
};

const RegistrationSection = () => {
  return (
    <section className="c-section" id="broneerimine">
      <div className="o-container">
        <h3 className="c-section-heading">Broneerimine</h3>
        <b className="u-orange">TÄHELEPANU!</b>
        {/*<p>01.01.22. kell 14.00 avaneb siin registreerimisportaal.</p>*/}
        <p>
          Laagrisse registreerimine toimub ainult läbi kodulehe. Kui
          registreerija on ankeedi täitnud, saab ta oma kontaktmeilile arve
          laagri osalustasu maksmiseks.
        </p>
        <Link to="/registreerimine/" className="c-btn u-text-center u-mt-1em">
          Registreerimisportaal
        </Link>
        <p className="u-mt-1em">
          Makseinfo leiate{" "}
          <Link to="/info/maksmine/#makseinfo" className="t-visible">
            siit
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export const loader = async () => {
  const dbShifts = await prisma.shiftInfo.findMany({
    select: {
      id: true,
      startDate: true,
      length: true,
      bossName: true,
      bossEmail: true,
      bossPhone: true
    }
  });

  return { dbShifts };
};

const ShiftDatesSection = () => {
  const { dbShifts } = useLoaderData<typeof loader>();

  const shifts: ShiftInfo[] = [];
  dbShifts.forEach((shift) => {
    shifts.push({
      shiftNr: shift.id,
      name: shift.bossName,
      username: shift.bossEmail.split("@")[0],
      phone: shift.bossPhone,
      shiftLen: shift.length,
      shiftStartDate: new Date(shift.startDate)
    });
  });

  const shiftYear = shifts[0].shiftStartDate.getUTCFullYear();

  return (
    <section className="c-section" id="ajad">
      <div className="o-container">
        <h3 className="c-section-heading">{shiftYear} Laagrivahetuste ajad</h3>
        <WarningBanner>
          Tähelepanu!
          Kuvatud kuupäevad on merelaagri 2025 <strong>prognoositud</strong> kuupäevad.
          Kuupäevad võivad erakorraliste põhjuste tõttu muutuda 10.01.2025.
          Seetõttu algab registreerimine 12.01.2025 kell 14.00.
          Rohkem infot peagi.
        </WarningBanner>
        <CalendarsComponent shifts={shifts} />
        <ShiftInfoComponent shifts={shifts} />
      </div>
    </section>
  );
};

export default function ShiftInfoRoute() {
  return (
    <main>
      <ShiftDatesSection />
      <RegistrationSection />
    </main>
  );
}
