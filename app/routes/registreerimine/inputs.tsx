import { ChangeEvent, ForwardedRef } from "react";
import React, { forwardRef } from "react";
import { Link } from "react-router";
import { ShiftDateSpans } from "~/utils/shift-dates";

interface FormInputProps {
  entryId: number;
  isRequired?: boolean;
  isHidden?: boolean;
}

const counties: string[] = [
  "Harjumaa",
  "Tartumaa",
  "Ida-Virumaa",
  "Pärnumaa",
  "Lääne-Virumaa",
  "Viljandimaa",
  "Raplamaa",
  "Võrumaa",
  "Saaremaa",
  "Jõgevamaa",
  "Järvamaa",
  "Valgamaa",
  "Põlvamaa",
  "Läänemaa",
  "Hiiumaa",
];

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
  isHidden,
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

export const UseIDCodeInput = forwardRef(
  (
    { entryId, setUseIDCode }: UseIDCodeInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setUseIDCode(!target.checked);
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

interface ShiftInputProps extends FormInputProps {
  shiftDateSpans: ShiftDateSpans;
  onChange: (newShift: number) => void;
}

export const ShiftInput = forwardRef(
  (
    { entryId, isRequired, shiftDateSpans, onChange }: ShiftInputProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const handleSelection = ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(target.value, 10);
      if (isNaN(value)) return; // someone is messing around
      onChange(value);
    };

    const options = [];
    for (const [i, span] of shiftDateSpans.entries()) {
      const id = i + 1;
      options.push(
        <option value={id} key={id}>
          {id}. vahetus ({span})
        </option>
      );
    }

    return (
      <div className="registration-form__field">
        <label htmlFor={`vahetus-${entryId}`} className="u-required">
          Laagrivahetus
        </label>
        <select
          ref={ref}
          id={`vahetus-${entryId}`}
          className="shiftField"
          name="shiftNr"
          required={isRequired}
          onChange={handleSelection}
        >
          <option value={0}>--Valige vahetus--</option>
          {options.map((option) => option)}
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

interface SeniorityInputProps extends FormInputProps {
  onChange: (isNew: boolean) => void;
}

export const SeniorityInput = forwardRef(
  (
    { entryId, isRequired, onChange }: SeniorityInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleToggle = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value: string = target.value;
      if (value !== "true" && value !== "false") return; // someone is messing around
      onChange(value === "true");
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
            value="true"
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
            value="false"
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
