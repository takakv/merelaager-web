import { Form, useLoaderData } from "react-router";
import React, {
  ForwardedRef,
  forwardRef,
  JSX,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { InfoBanner, WarningBanner } from "~/components/banners";

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

const FormUseIDCodeRow = forwardRef(
  (
    { entryId, setUseIDCode }: FormUseIDCodeRowProps,
    ref: ForwardedRef<HTMLInputElement>
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

interface FormShiftPickerRowProps extends ChildFormEntryProps {
  shiftDateSpans: ShiftDateSpans;
  onPMUpdate: (modifier: ChildPriceModifier) => void;
}

const FormShiftPickerRow = ({
  entryId,
  required,
  shiftDateSpans,
  onPMUpdate,
}: FormShiftPickerRowProps) => {
  const [selectedShift, setSelectedShift] = useState<number>(0);
  const [isNew, setIsNew] = useState<boolean | null>(null);

  // Use refs to get the selected values even after page refreshes.
  const selectedShiftRef = useRef<HTMLSelectElement>(null);
  const isOldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedShiftRef.current) {
      setSelectedShift(parseInt(selectedShiftRef.current.value, 10) || 0);
    }
    if (isOldRef.current) {
      setIsNew(!isOldRef.current.checked);
    }
  }, []);

  useEffect(() => {
    // Do not run for the default values.
    if (selectedShift === 0 && isNew === null) return;

    const modifier: ChildPriceModifier = {
      childIndex: entryId,
      shiftNr: selectedShift,
      isNew: isNew,
      isActive: required,
    };
    onPMUpdate(modifier);
  }, [selectedShift, isNew]);

  return (
    <div className="registration-form__row has-after">
      <ShiftInput
        entryId={entryId}
        isRequired={required}
        shiftDateSpans={shiftDateSpans}
        onChange={setSelectedShift}
        ref={selectedShiftRef}
      />
      <ShirtInput entryId={entryId} isRequired={required} />
      <SeniorityInput
        entryId={entryId}
        isRequired={required}
        onChange={setIsNew}
        ref={isOldRef}
      />
    </div>
  );
};

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
  isVisible: boolean;
  onRemoveChild: (childIndex: number) => void;
}

const RemoveChildButton = ({
  entryId,
  isVisible,
  onRemoveChild,
}: RemoveChildButtonProps): null | JSX.Element => {
  if (!isVisible) return null;
  return (
    <div
      className="registration-form__close"
      onClick={() => onRemoveChild(entryId)}
    ></div>
  );
};

interface ChildFormProps {
  entryId: number;
  childCount: number;
  shiftDateSpans: ShiftDateSpans;
  onRemoveChild: (childIndex: number) => void;
  onPMUpdate: (modifier: ChildPriceModifier) => void;
}

const ChildFormEntry = ({
  entryId,
  childCount,
  shiftDateSpans,
  onRemoveChild,
  onPMUpdate,
}: ChildFormProps) => {
  const [useIDCode, setUseIDCode] = useState<boolean>(true);

  // Use refs to get the selected values even after page refreshes.
  const idCodeCheckboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (idCodeCheckboxRef.current)
      setUseIDCode(!idCodeCheckboxRef.current.checked);
  }, []);

  const isVisible: boolean = entryId < childCount;

  return (
    <div
      className={"registration-form__unit" + (isVisible ? "" : " is-hidden")}
    >
      <RemoveChildButton
        entryId={entryId}
        isVisible={entryId === childCount - 1 && childCount !== 1}
        onRemoveChild={onRemoveChild}
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
        onPMUpdate={onPMUpdate}
      />
      <p>Elukoht:</p>
      <FormAddressRow entryId={entryId} required={isVisible} />
      <FormAddendumRow entryId={entryId} required={isVisible} />
    </div>
  );
};

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
  onAddChild: () => void;
}

const AddChildButton = ({
  isActive,
  onAddChild,
}: AddChildButtonProps): null | JSX.Element => {
  if (!isActive) return null;
  return (
    <div className="registration-form__unit registration-form__unit--mt0">
      <div id="addChild">
        <div className="contents">
          <p>Lisa laps</p>
          <div className="u-plus" onClick={onAddChild}></div>
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

export type ChildPriceModifier = {
  childIndex: number;
  shiftNr: number;
  isNew: boolean | null;
  isActive: boolean;
};

type Action =
  | {
      type: "changed";
      modifier: ChildPriceModifier;
    }
  | {
      type: "removed" | "added";
      childIndex: number;
    };

const priceReducer = (modifiers: ChildPriceModifier[], action: Action) => {
  switch (action.type) {
    case "added":
      return modifiers.map((m) => {
        if (m.childIndex !== action.childIndex) return m;
        m.isActive = true;
        return m;
      });
    // How the reducer should work without the prefilled list approach.
    /*return [
      ...modifiers,
      {
        childIndex: action.childIndex,
        shiftNr: 0,
        isNew: null,
      },
    ];*/
    case "changed":
      return modifiers.map((m) => {
        if (m.childIndex === action.modifier.childIndex) return action.modifier;
        return m;
      });
    case "removed":
      return modifiers.map((m) => {
        if (m.childIndex !== action.childIndex) return m;
        m.isActive = false;
        return m;
      });
    // How the reducer should work without the prefilled list approach.
    /*return modifiers.filter((m) => m.childIndex !== action.childIndex);*/
  }
};

const RegistrationForm = () => {
  const { shifts } = useLoaderData<typeof loader>();
  const shiftDateSpans = getShiftDateSpans(shifts);

  const maxChildCount = 4;
  const upfrontRegistrationFee = 100;
  const shiftFullPrice = 350;
  const seniorityDiscount = 20;

  const specialPrices = [
    {
      shiftNr: 1,
      fullPrice: 290,
      discount: 10,
    },
  ];

  // Always set up price modifiers for all potential children, even if less
  // children are registered at once. This is a lazy way to enable keeping the
  // price state consistent even across page refreshes.
  // TODO: find a more elegant approach.
  const [priceModifiers, dispatch] = useReducer(
    priceReducer,
    Array.from(Array(maxChildCount).entries(), ([i, _]) => {
      return {
        childIndex: i,
        shiftNr: 0,
        isNew: null,
        isActive: i === 0,
      };
    })
  );

  /*
  const [priceModifiers, dispatch] = useReducer(priceReducer, [
    {
      childIndex: 0,
      shiftNr: 0,
      isNew: null,
    },
  ]);*/

  const handleAddChild = () => {
    const resultingChildCount = childCount + 1;
    if (resultingChildCount > maxChildCount) return;
    if (resultingChildCount === maxChildCount) setCanAddMoreChildren(false);

    dispatch({
      type: "added",
      childIndex: childCount,
    });
    setChildCount(resultingChildCount);
  };

  const handleEditModifier = (modifier: ChildPriceModifier) => {
    dispatch({
      type: "changed",
      modifier,
    });
  };

  const handleRemoveChild = (childIndex: number) => {
    const resultingChildCount: number = childCount - 1;
    if (resultingChildCount < 1) return;
    if (resultingChildCount < maxChildCount) setCanAddMoreChildren(true);
    setChildCount(resultingChildCount);

    dispatch({
      type: "removed",
      childIndex: childIndex,
    });
  };

  const [childCount, setChildCount] = useState<number>(1);
  const [canAddMoreChildren, setCanAddMoreChildren] = useState<boolean>(true);

  const getUpdatedPrice = (): number => {
    let totalShiftPrice = 0;
    for (let i = 0; i < childCount; i++) {
      let fullPrice = shiftFullPrice;
      let discount = seniorityDiscount;
      const specialPrice = specialPrices.find(
        (e) => e.shiftNr === priceModifiers[i].shiftNr
      );
      if (specialPrice) {
        fullPrice = specialPrice.fullPrice;
        discount = specialPrice.discount;
      }
      totalShiftPrice += fullPrice;
      // Do not apply the discount if the status is unknown (null).
      if (priceModifiers[i].isNew === false) totalShiftPrice -= discount;
    }
    return totalShiftPrice;
  };

  const registrationFee: number = childCount * upfrontRegistrationFee;
  const fullPrice: number = getUpdatedPrice();

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
          onRemoveChild={handleRemoveChild}
          onPMUpdate={handleEditModifier}
        />
      ))}
      <AddChildButton
        isActive={canAddMoreChildren}
        onAddChild={handleAddChild}
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
