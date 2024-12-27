export interface ShiftDateInfo {
  startDate: Date;
  length: number;
}

const shiftDateDisplayFormat = new Intl.DateTimeFormat("et", {
  month: "2-digit",
  day: "2-digit",
});

export type ShiftDateSpans = string[];

export const getShiftDateSpan = (shift: ShiftDateInfo): string => {
  const shiftStartDate = shift.startDate;
  // End date is inclusive, so subtract one.
  const shiftEndDate = new Date(
    shiftStartDate.getFullYear(),
    shiftStartDate.getMonth(),
    shiftStartDate.getDate() + shift.length - 1
  );

  return (
    shiftDateDisplayFormat.format(shiftStartDate) +
    "-" +
    shiftDateDisplayFormat.format(shiftEndDate)
  );
};

export const getShiftDateSpans = (shifts: ShiftDateInfo[]): ShiftDateSpans => {
  const dateSpans: string[] = [];
  shifts.forEach((shift) => {
    dateSpans.push(getShiftDateSpan(shift));
  });
  return dateSpans;
};
