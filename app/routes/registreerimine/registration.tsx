import { Form, useLoaderData } from "react-router";
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  JSX,
  RefAttributes,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { InfoBanner, WarningBanner } from "~/components/banners";

import type {
  IUpdateSeniority,
  IUpdateShifts,
} from "~/routes/registreerimine/inputs";
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
  UseIDCodeInput,
} from "~/routes/registreerimine/inputs";
import { loader } from "~/routes/registreerimine/route";
import { getShiftDateSpans, ShiftDateSpans } from "~/utils/shift-dates";

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
  useIDCode,
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
    IUpdateSeniority,
    IUpdateShifts {
  shiftDateSpans: ShiftDateSpans;
}

const FormShiftPickerRow: ForwardRefExoticComponent<
  FormShiftPickerRowProps & RefAttributes<any>
> = forwardRef(
  (
    {
      entryId,
      required,
      shiftDateSpans,
      updateSeniority,
      updateShifts,
    }: FormShiftPickerRowProps,
    ref: ForwardedRef<any>
  ) => {
    const seniorityRef: RefObject<unknown> = useRef(null);
    const shiftRef: RefObject<unknown> = useRef(null);

    useImperativeHandle(ref, () => {
      return {
        senior: seniorityRef,
        shift: shiftRef,
      };
    });

    return (
      <div className="registration-form__row has-after">
        <ShiftInput
          entryId={entryId}
          isRequired={required}
          shiftDateSpans={shiftDateSpans}
          updateShifts={updateShifts}
          ref={shiftRef}
        />
        <ShirtInput entryId={entryId} isRequired={required} />
        <SeniorityInput
          updateSeniority={updateSeniority}
          entryId={entryId}
          isRequired={required}
          ref={seniorityRef}
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
  removeChildCard,
}: RemoveChildButtonProps): null | JSX.Element => {
  if (entryId !== childCount - 1 || childCount === 1) return null;
  return (
    <div className="registration-form__close" onClick={removeChildCard}></div>
  );
};

interface ChildFormProps extends IUpdateSeniority, IUpdateShifts {
  entryId: number;
  childCount: number;
  shiftDateSpans: ShiftDateSpans;
  removeChildCard: () => void;
}

const ChildFormEntry: ForwardRefExoticComponent<
  ChildFormProps & RefAttributes<any>
> = forwardRef(
  (
    {
      entryId,
      childCount,
      shiftDateSpans,
      removeChildCard,
      updateSeniority,
      updateShifts,
    }: ChildFormProps,
    ref: ForwardedRef<any>
  ) => {
    const [useIDCode, setUseIDCode] = useState<boolean>(true);
    const idCodeCheckboxRef: RefObject<null> = useRef(null);

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
          shiftDateSpans={shiftDateSpans}
          updateSeniority={updateSeniority}
          updateShifts={updateShifts}
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
  addChildCard,
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  /*
  const unlockTime = new Date(Date.parse("01 Jan 2024 11:59:59 UTC")).getTime();
  const now = Date.now();

  useEffect(() => {
    if (now > unlockTime) {
      setIsDisabled(false);
      return () => {};
    }

    const eta = unlockTime - now;
    console.log(`Unlock ETA: ${eta}`);
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, eta);
    return () => clearTimeout(timer);
  }, []);
  */

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
  const { shifts } = useLoaderData<typeof loader>();
  const shiftDateSpans = getShiftDateSpans(shifts);

  const maxChildCount = 4;
  const upfrontRegistrationFee = 100;
  const shiftFullPrice = 240;
  const shortDiscount = 20;
  const seniorityDiscount = 20;

  const [childCount, setChildCount] = useState<number>(1);
  const [canAddMoreChildren, setCanAddMoreChildren] = useState<boolean>(true);
  const [seniorityStatuses, setSeniorityStatuses] = useState<boolean[]>([]);
  const [selectedShifts, setSelectedShifts] = useState<number[]>([]);

  const childrenRef: RefObject<unknown> = useRef(null);
  useEffect(() => {
    const initialSeniorityStatuses: boolean[] = [];
    const initialShifts: number[] = [];

    (childrenRef.current as Map<number, any>).forEach((value) => {
      initialSeniorityStatuses.push(value.senior.current.checked);
      initialShifts.push(parseInt(value.shift.current.value, 10) || 0);
    });

    setSeniorityStatuses(initialSeniorityStatuses);
    setSelectedShifts(initialShifts);
  }, []);

  const getUpdatedPrice = (): number => {
    let totalShiftPrice: number = childCount * shiftFullPrice;
    for (let i = 0; i < childCount; ++i) {
      if (selectedShifts[i] === 1) totalShiftPrice -= shortDiscount;
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

  const updateShifts = (entryId: number, shiftNr: string) => {
    const nextShifts: number[] = selectedShifts.map(
      (status: number, idx: number): number => {
        if (idx === entryId) return parseInt(shiftNr, 10) || 0;
        return status;
      }
    );
    setSelectedShifts(nextShifts);
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
    if (!childrenRef.current) {
      childrenRef.current = new Map<number, any>();
    }
    return childrenRef.current as Map<number, any>;
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
          shiftDateSpans={shiftDateSpans}
          removeChildCard={removeChildCard}
          updateSeniority={updateSeniority}
          updateShifts={updateShifts}
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
          NB! Registreerimine algab 12. jaanuaril 2025 kell 14.00.
          Laagrivahetuste kuupäevad võivad muutuda kuni 10. jaanuarini!
        </WarningBanner>
        {/*<WarningBanner>
          <b>NB!</b> Registreerimiskinnitus ei ole enam automaatne.
          Registreerimiskinnituse saate meilile siis, kui juhataja on koha
          kinnitanud. Kohtade kinnitamine toimub endiselt ajalise järjekorra
          põhiselt.
        </WarningBanner>
        <InfoBanner>
          Vabade kohtade puudumisel saate registreeruda reservnimekirja selle
          sama vormi abil.
        </InfoBanner>*/}
        <RegistrationForm />
      </div>
    </section>
  );
};
