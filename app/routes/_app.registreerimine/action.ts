export const formAction = async (form: FormData) => {
  const childCountFromForm = form.get("childCount");

  if (!childCountFromForm || typeof childCountFromForm !== "string")
    return null;

  const childCount = parseInt(childCountFromForm, 10);
  if (isNaN(childCount)) return null;

  const names = form.getAll("name");
  const idCodes = form.getAll("idCode");
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

  console.log(newcomers);

  /*
  const useIdCodes: boolean[] = [];
  for (let i = 0; i < childCount; ++i) {
    useIdCodes.push(!form.get(`useIdCode-${i}`));
  }
  */
};
