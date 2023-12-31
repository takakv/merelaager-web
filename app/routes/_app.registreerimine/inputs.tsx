import type { ChangeEvent, ForwardedRef, ForwardRefExoticComponent, RefAttributes } from "react";
import React, { forwardRef } from "react";
import { Link } from "@remix-run/react";

export interface IUpdateShifts {
  updateShifts: (entryId: number, shift: string) => void;
}

interface FormInputProps {
  entryId: number;
  isRequired?: boolean;
  isHidden?: boolean;
}

const counties: string[] = [
  "Harju",
  "Tartu",
  "Ida-Viru",
  "Pärnu",
  "Lääne-Viru",
  "Viljandi",
  "Rapla",
  "Võru",
  "Saare",
  "Jõgeva",
  "Järva",
  "Valga",
  "Põlva",
  "Lääne",
  "Hiiu"
].map((county: string): string => county + "maa");

export const NameInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`name-${entryId}`} className="u-required">
        Nimi
      </label>
      <input
        type="text"
        name="name"
        id={`name-${entryId}`}
        className="nameField"
        required={isRequired}
      />
    </div>
  );
};

export const IDCodeInput = ({
                              entryId,
                              isRequired,
                              isHidden
                            }: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <label htmlFor={`idCode-${entryId}`} className="u-required">
        Isikukood
      </label>
      <input
        type="text"
        name="idCode"
        id={`idCode-${entryId}`}
        className="idCodeField"
        pattern="[0-9]{11}"
        required={isRequired}
      />
    </div>
  );
};

export const SexInput = ({ entryId, isRequired, isHidden }: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <p className="u-required">Sugu:</p>
      <label htmlFor={`sex-m-${entryId}`}>Poiss</label>
      <input
        type="radio"
        name="sex"
        id={`sex-m-${entryId}`}
        value="M"
        className="sexField"
        required={isRequired}
      />
      <label htmlFor={`sex-f-${entryId}`}>Tüdruk</label>
      <input
        type="radio"
        name="sex"
        id={`sex-f-${entryId}`}
        value="F"
        required={isRequired}
      />
    </div>
  );
};

export const DOBInput = ({ entryId, isRequired, isHidden }: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <label htmlFor={`dob-${entryId}`} className="u-required">
        Sünnipäev
      </label>
      <input
        type="date"
        name="dob"
        id={`dob-${entryId}`}
        className="DOBField"
        required={isRequired}
      />
    </div>
  );
};

interface UseIDCodeInputProps extends FormInputProps {
  setUseIDCode: (useIDCode: boolean) => void;
}

export const UseIDCodeInput: ForwardRefExoticComponent<
  UseIDCodeInputProps & RefAttributes<any>
> = forwardRef(
  ({ entryId, setUseIDCode }: UseIDCodeInputProps, ref: ForwardedRef<any>) => {
    const handleChange = ({ target }: ChangeEvent) => {
      setUseIDCode(!(target as HTMLInputElement).checked);
    };

    return (
      <div className="registration-form__field registration-form__field--row">
        <label htmlFor={`useIdCode-${entryId}`}>Pole Eesti isikukoodi</label>
        <input
          type="checkbox"
          name={`useIdCode-${entryId}`}
          id={`useIdCode-${entryId}`}
          className="useIdCode"
          value={entryId}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    );
  }
);

interface ShiftInputProps extends FormInputProps, IUpdateShifts {
}

export const ShiftInput: ForwardRefExoticComponent<
  ShiftInputProps & RefAttributes<any>
> = forwardRef(({
                  entryId,
                  isRequired,
                  updateShifts
                }: ShiftInputProps,
                ref: ForwardedRef<any>) => {
    const handleSelection = ({ target }: ChangeEvent) => {
      const value: string = (target as HTMLSelectElement).value;
      console.log(value);
      updateShifts(entryId, value);
    };

    return (
      <div className="registration-form__field">
        <label htmlFor={`vahetus-${entryId}`} className="u-required">
          Laagrivahetus
        </label>
        <select
          id={`vahetus-${entryId}`}
          className="shiftField"
          name="shiftNr"
          required={isRequired}
          onChange={handleSelection}
          ref={ref}
        >
          <option value="">--Valige vahetus--</option>
          <option value="1">1. vahetus (26.06–07.07)</option>
          <option value="2">2. vahetus (10.07–21.07)</option>
          <option value="3">3. vahetus (24.07–04.08)</option>
          <option value="4">4. vahetus (07.08–18.08)</option>
        </select>
      </div>
    );
  }
);

export const ShirtInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`shirtSize-${entryId}`} className="u-required">
        T-särgi suurus
      </label>
      <select
        id={`shirtSize-${entryId}`}
        className="shirtSizeField"
        name="tsSize"
        required={isRequired}
      >
        <option value="">--Valige suurus--</option>
        <option value="118/128">118/128</option>
        <option value="130/140">130/140</option>
        <option value="142/152">142/152</option>
        <option value="152/164">152/164</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>
  );
};

export interface IUpdateSeniority {
  updateSeniority: (entryId: number, isSenior: boolean) => void;
}

interface SeniorityInputProps extends FormInputProps, IUpdateSeniority {
}

export const SeniorityInput: ForwardRefExoticComponent<
  SeniorityInputProps & RefAttributes<any>
> = forwardRef(
  (
    { entryId, isRequired, updateSeniority }: SeniorityInputProps,
    ref: ForwardedRef<any>
  ) => {
    const handleToggle = ({ target }: ChangeEvent) => {
      const value: string = (target as HTMLInputElement).value;
      updateSeniority(entryId, value === "no");
    };

    return (
      <div className="registration-form__field registration-form__field--row">
        <p className="u-required">Esimest korda merelaagris?</p>
        <div className="group">
          <label htmlFor={`newcomer-${entryId}-y`}>Jah</label>
          <input
            type="radio"
            defaultChecked={false}
            id={`newcomer-${entryId}-y`}
            name={`newcomer-${entryId}`}
            value="yes"
            className="newField-y nf"
            onChange={handleToggle}
            required={isRequired}
          />
        </div>
        <div className="group">
          <label htmlFor={`newcomer-${entryId}-n`}>Ei</label>
          <input
            type="radio"
            ref={ref}
            defaultChecked={false}
            id={`newcomer-${entryId}-n`}
            name={`newcomer-${entryId}`}
            value="no"
            className="newField-n nf"
            onChange={handleToggle}
            required={isRequired}
          />
        </div>
      </div>
    );
  }
);

export const RoadInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`road-${entryId}`} className="u-required">
        Tänav
      </label>
      <input
        type="text"
        name="road"
        id={`road-${entryId}`}
        className="roadField"
        required={isRequired}
      />
    </div>
  );
};

export const CityInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`city-${entryId}`} className="u-required">
        Linn / Küla / Vald
      </label>
      <input
        type="text"
        name="city"
        id={`city-${entryId}`}
        className="cityField"
        required={isRequired}
      />
    </div>
  );
};

export const CountyInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`county-${entryId}`} className="u-required">
        Maakond
      </label>
      <input
        list="counties"
        id={`county-${entryId}`}
        name="county"
        className="countyField"
        required={isRequired}
      />
      <datalist id="counties">
        {counties.map((county: string) => (
          <option key={county}>{county}</option>
        ))}
      </datalist>
    </div>
  );
};

export const CountryInput = ({ entryId, isRequired }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`country-${entryId}`} className="u-required">
        Riik
      </label>
      <input
        type="text"
        name="country"
        id={`country-${entryId}`}
        defaultValue="Eesti"
        className="countryField"
        required={isRequired}
      />
    </div>
  );
};

export const AddendumInput = ({ entryId }: FormInputProps) => {
  const maxLength: number = 255;
  return (
    <div className="registration-form__field registration-form__field--full">
      <label htmlFor={`addendum-${entryId}`}>
        Muu info (allergiad, erivajadused jms):
      </label>
      <textarea
        name="addendum"
        id={`addendum-${entryId}`}
        className="full-width"
        placeholder={`Võib tühjaks jääda (maksimum ${maxLength} tähemärki).`}
        maxLength={maxLength}
      ></textarea>
    </div>
  );
};

export const ParentNameInput = () => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_name" className="u-required">
        Nimi
      </label>
      <input type="text" name="contactName" id="guardian_name" required />
    </div>
  );
};

export const ParentPhoneInput = () => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_phone" className="u-required">
        Telefon
      </label>
      <input type="tel" name="contactNumber" id="guardian_phone" required />
    </div>
  );
};

export const ParentEmailInput = () => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_email" className="u-required">
        E-post
      </label>
      <input type="email" name="contactEmail" id="guardian_email" required />
    </div>
  );
};

export const ParentBackupPhoneInput = () => {
  return (
    <div className="registration-form__field">
      <label htmlFor="alt_phone">Varutelefon</label>
      <input type="tel" name="backupTel" id="alt_phone" />
    </div>
  );
};

export const TermsAcknowledgeInput = () => {
  return (
    <div className="registration-form__field registration-form__field--row">
      <label htmlFor="disclaimer" className="u-required">
        Nõustun laagri{" "}
        <Link to="/info/laagrist/#kodukord" className="t-visible">
          kodukorraga
        </Link>
        .
      </label>
      <input type="checkbox" id="disclaimer" required autoComplete="off" />
    </div>
  );
};
