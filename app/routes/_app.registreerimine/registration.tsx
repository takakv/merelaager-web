import { Form } from "@remix-run/react";
import type { ForwardedRef, ForwardRefExoticComponent, MutableRefObject, RefAttributes } from "react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import { InfoBanner, WarningBanner } from "~/components/banners";

import type { IUpdateSeniority } from "~/routes/_app.registreerimine/inputs";
import {
  AddendumInput,
  CityInput,
  CountryInput,
  CountyInput,
  DOBInput,
  IDCodeInput,
  NameInput,
  ParentBackupPhoneInput,
  ParentEmailInput,
  ParentNameInput,
  ParentPhoneInput,
  RoadInput,
  SeniorityInput,
  SexInput,
  ShiftInput,
  ShirtInput,
  TermsAcknowledgeInput,
  UseIDCodeInput
} from "~/routes/_app.registreerimine/inputs";

interface ChildFormEntryProps {
  entryId: number;
  required: boolean;
}

interface FormChildBasicRowProps extends ChildFormEntryProps {
  useIDCode: boolean;
}

const FormChildBasicRow = ({
                             entryId,
                             required,
                             useIDCode
                           }: FormChildBasicRowProps) => {
  return (
    <div className="registration-form__row has-after">
      <NameInput entryId={entryId} isRequired={required} />
      <IDCodeInput
        entryId={entryId}
        isRequired={required && useIDCode}
        isHidden={!useIDCode}
      />
      <SexInput
        entryId={entryId}
        isRequired={required && !useIDCode}
        isHidden={useIDCode}
      />
      <DOBInput
        entryId={entryId}
        isRequired={required && !useIDCode}
        isHidden={useIDCode}
      />
    </div>
  );
};

interface FormUseIDCodeRowProps extends ChildFormEntryProps {
  setUseIDCode: (useIDCode: boolean) => void;
}

const FormUseIDCodeRow: ForwardRefExoticComponent<
  FormUseIDCodeRowProps & RefAttributes<any>
> = forwardRef(
  (
    { entryId, setUseIDCode }: FormUseIDCodeRowProps,
    ref: ForwardedRef<any>
  ) => {
    return (
      <div className="registration-form__row registration-form__row--minor">
        <UseIDCodeInput
          entryId={entryId}
          setUseIDCode={setUseIDCode}
          ref={ref}
        />
      </div>
    );
  }
);

interface FormShiftPickerRowProps
  extends ChildFormEntryProps,
    IUpdateSeniority {
}

const FormShiftPickerRow: ForwardRefExoticComponent<
  FormShiftPickerRowProps & RefAttributes<any>
> = forwardRef(
  (
    { entryId, required, updateSeniority }: FormShiftPickerRowProps,
    ref: ForwardedRef<any>
  ) => {
    return (
      <div className="registration-form__row has-after">
        <ShiftInput entryId={entryId} isRequired={required} />
        <ShirtInput entryId={entryId} isRequired={required} />
        <SeniorityInput
          updateSeniority={updateSeniority}
          entryId={entryId}
          isRequired={required}
          ref={ref}
        />
      </div>
    );
  }
);

const FormAddressRow = ({ entryId, required }: ChildFormEntryProps) => {
  return (
    <div className="registration-form__row">
      <RoadInput entryId={entryId} isRequired={required} />
      <CityInput entryId={entryId} isRequired={required} />
      <CountyInput entryId={entryId} isRequired={required} />
      <CountryInput entryId={entryId} isRequired={required} />
    </div>
  );
};

const FormAddendumRow = ({ entryId }: ChildFormEntryProps) => {
  return (
    <div className="registration-form__row">
      <AddendumInput entryId={entryId} />
    </div>
  );
};

interface RemoveChildButtonProps {
  entryId: number;
  childCount: number;
  removeChildCard: () => void;
}

const RemoveChildButton = ({
                             entryId,
                             childCount,
                             removeChildCard
                           }: RemoveChildButtonProps): null | JSX.Element => {
  if (entryId !== childCount - 1 || childCount === 1) return null;
  return (
    <div className="registration-form__close" onClick={removeChildCard}></div>
  );
};

interface ChildFormProps extends IUpdateSeniority {
  entryId: number;
  childCount: number;
  removeChildCard: () => void;
}

const ChildFormEntry: ForwardRefExoticComponent<
  ChildFormProps & RefAttributes<any>
> = forwardRef(
  (
    { entryId, childCount, removeChildCard, updateSeniority }: ChildFormProps,
    ref: ForwardedRef<any>
  ) => {
    const [useIDCode, setUseIDCode] = useState<boolean>(true);
    const idCodeCheckboxRef: MutableRefObject<null> = useRef(null);

    const isVisible: boolean = entryId < childCount;

    useEffect(() => {
      if (idCodeCheckboxRef.current)
        setUseIDCode(!(idCodeCheckboxRef.current as HTMLInputElement).checked);
    }, []);

    return (
      <div
        className={"registration-form__unit" + (isVisible ? "" : " is-hidden")}
      >
        <RemoveChildButton
          entryId={entryId}
          childCount={childCount}
          removeChildCard={removeChildCard}
        />
        <FormChildBasicRow
          entryId={entryId}
          required={isVisible}
          useIDCode={useIDCode}
        />
        <FormUseIDCodeRow
          entryId={entryId}
          required={isVisible}
          setUseIDCode={setUseIDCode}
          ref={idCodeCheckboxRef}
        />
        <FormShiftPickerRow
          entryId={entryId}
          required={isVisible}
          updateSeniority={updateSeniority}
          ref={ref}
        />
        <p>Elukoht:</p>
        <FormAddressRow entryId={entryId} required={isVisible} />
        <FormAddendumRow entryId={entryId} required={isVisible} />
      </div>
    );
  }
);

const ParentFormEntry = () => {
  return (
    <div className="registration-form__unit">
      <div className="registration-form__row">
        <ParentNameInput />
        <ParentPhoneInput />
        <ParentEmailInput />
      </div>
      <div className="registration-form__row">
        <ParentBackupPhoneInput />
        <TermsAcknowledgeInput />
      </div>
    </div>
  );
};

interface AddChildButtonProps {
  isActive: boolean;
  addChildCard: () => void;
}

const AddChildButton = ({
                          isActive,
                          addChildCard
                        }: AddChildButtonProps): null | JSX.Element => {
  if (!isActive) return null;
  return (
    <div className="registration-form__unit registration-form__unit--mt0">
      <div id="addChild">
        <div className="contents">
          <p>Lisa laps</p>
          <div className="u-plus" onClick={addChildCard}></div>
        </div>
      </div>
    </div>
  );
};

const RegistrationSubmitButton = () => {
  const isDisabled: boolean = true;

  return (
    <button
      type="submit"
      name="submit"
      value="submit"
      className="c-btn"
      id="submitBtn"
      disabled={isDisabled}
    >
      Registreerin
    </button>
  );
};

const RegistrationForm = () => {
  const maxChildCount = 4;
  const upfrontRegistrationFee = 100;
  const shiftFullPrice = 240;
  const seniorityDiscount = 20;

  const [childCount, setChildCount] = useState<number>(1);
  const [canAddMoreChildren, setCanAddMoreChildren] = useState<boolean>(true);
  const [seniorityStatuses, setSeniorityStatuses] = useState<boolean[]>([]);

  // References for the radio boxes that define seniority status.
  // We need the references to re-read the pre-filled values in Firefox if a
  // user refreshes or navigates back to the page.
  const senioritiesRef: MutableRefObject<unknown> = useRef(null);

  // Read the radio box values using the references, and pre-populate the
  // price-info array containing seniority statuses.
  useEffect(() => {
    const initialSeniorityStatuses: boolean[] = [];
    (senioritiesRef.current as Map<number, any>).forEach(
      (value: HTMLInputElement) => {
        initialSeniorityStatuses.push(value.checked);
      }
    );
    setSeniorityStatuses(initialSeniorityStatuses);
  }, []);

  const getUpdatedPrice = (): number => {
    let totalShiftPrice: number = childCount * shiftFullPrice;
    for (let i = 0; i < childCount; ++i) {
      if (seniorityStatuses[i]) totalShiftPrice -= seniorityDiscount;
    }
    return totalShiftPrice;
  };

  const updateSeniority = (entryId: number, isSenior: boolean) => {
    const nextSeniorityStatuses: boolean[] = seniorityStatuses.map(
      (status: boolean, idx: number): boolean => {
        if (idx === entryId) return isSenior;
        return status;
      }
    );
    setSeniorityStatuses(nextSeniorityStatuses);
  };

  const addChildCard = () => {
    const resultingChildCount: number = childCount + 1;
    if (resultingChildCount > maxChildCount) return;
    if (resultingChildCount === maxChildCount) setCanAddMoreChildren(false);
    setChildCount(resultingChildCount);
  };

  const removeChildCard = () => {
    const resultingChildCount: number = childCount - 1;
    if (resultingChildCount < 1) return;
    if (resultingChildCount < maxChildCount) setCanAddMoreChildren(true);
    setChildCount(resultingChildCount);
  };

  const getMap = (): Map<number, any> => {
    if (!senioritiesRef.current) {
      senioritiesRef.current = new Map<number, any>();
    }
    return senioritiesRef.current as Map<number, any>;
  };

  const registrationFee: number = childCount * upfrontRegistrationFee;
  const fullPrice: number = getUpdatedPrice() + registrationFee;

  return (
    <Form method="post" className="registration-form" id="regform">
      <b className="u-italic u-regular">
        <span className="u-required"></span>
        Tärniga märgitud väljad on kohustuslikud.
      </b>
      <h4>Laagrilaps</h4>
      {Array.from({ length: maxChildCount }, (_, i) => (
        <ChildFormEntry
          key={i}
          entryId={i}
          childCount={childCount}
          removeChildCard={removeChildCard}
          updateSeniority={updateSeniority}
          ref={(node) => {
            const map: Map<number, any> = getMap();
            if (node) {
              map.set(i, node);
            } else {
              map.delete(i);
            }
          }}
        />
      ))}
      <AddChildButton
        isActive={canAddMoreChildren}
        addChildCard={addChildCard}
      />
      <h4>Kontaktisik</h4>
      <ParentFormEntry />
      <input
        type="number"
        name="childCount"
        value={childCount}
        id="childCount"
        hidden
        readOnly
        required
      />
      <RegistrationSubmitButton />
      <p className="u-inline-block u-ml-15">
        Broneerimistasu: <span id="pre-total">{registrationFee}</span>€ |
        Kogusumma: <span id="payment-total">{fullPrice}</span>€
      </p>
    </Form>
  );
};

export const RegistrationSection = () => {
  return (
    <section className="c-section">
      <div className="o-container">
        <h3 className="c-section-heading">Registreerimine</h3>
        <WarningBanner>
          <p>Registreerimine algab 01.01.2024 kell 14:00 Eesti aja järgi.</p>
        </WarningBanner>
        <WarningBanner>
          <b>NB!</b> Registreerimiskinnitus ei ole enam
          automaatne. Registreerimiskinnituse saate meilile siis, kui juhataja
          on koha kinnitanud. Kohtade kinnitamine toimub endiselt ajalise
          järjekorra põhiselt.
        </WarningBanner>
        <InfoBanner>
          Vabade kohtade puudumisel saate registreeruda reservnimekirja selle
          sama vormi abil.
        </InfoBanner>
        <RegistrationForm />
      </div>
    </section>
  );
};
