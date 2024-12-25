import * as process from "process";

type RegChildInfo = {
  name: string;
  idCode: string;
  shift: number;
  shirtSize: string;
  road: string;
  city: string;
  county: string;
  country: string;
  addendum: string;
  isNew: boolean;
  sex: string;
  dob: string;
  useIdCode: boolean;
};

type RegPayload = {
  children: RegChildInfo[];
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  backupTel: string;
};

export const formAction = async (form: FormData) => {
  const childCountFromForm = form.get("childCount");

  if (!childCountFromForm || typeof childCountFromForm !== "string")
    return null;

  const childCount = parseInt(childCountFromForm, 10);
  if (isNaN(childCount)) return null;

  const names = form.getAll("name");
  const idCodes = form.getAll("idCode");
  const sexes = form.getAll("sex");
  const dobs = form.getAll("dob");
  const shifts = form.getAll("shiftNr");
  const shirtSizes = form.getAll("tsSize");

  const newcomers: boolean[] = [];
  for (let i = 0; i < childCount; ++i) {
    const entry = form.get(`newcomer-${i}`);
    if (!entry) return null;
    newcomers.push((entry as string) === "yes");
  }

  const roads = form.getAll("road");
  const cities = form.getAll("city");
  const counties = form.getAll("county");
  const countries = form.getAll("country");
  const addendums = form.getAll("addendum");

  const useIdCodes: boolean[] = [];
  for (let i = 0; i < childCount; ++i) {
    useIdCodes.push(!form.get(`useIdCode-${i}`));
  }

  const regData: RegPayload = {
    children: [],
    contactName: (form.get("contactName") as string) ?? "",
    contactEmail: (form.get("contactEmail") as string) ?? "",
    contactNumber: (form.get("contactNumber") as string) ?? "",
    backupTel: (form.get(`backupTel`) as string) ?? "",
  };

  for (let i = 0; i < childCount; ++i) {
    regData.children.push({
      name: names[i] as string,
      idCode: idCodes[i] as string,
      shift: parseInt(shifts[i] as string, 10) || 0,
      shirtSize: shirtSizes[i] as string,
      road: roads[i] as string,
      city: cities[i] as string,
      county: counties[i] as string,
      country: countries[i] as string,
      addendum: addendums[i] as string,
      isNew: newcomers[i],
      sex: sexes[i] as string,
      dob: dobs[i] as string,
      useIdCode: useIdCodes[i],
    });
  }

  console.log(regData);

  const regUrl: string = process.env.REGISTRATION_URL ?? "";
  const response = await fetch(regUrl, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(regData),
  });

  return response.json();
};
