import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import { JSX } from "react";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.INFO_KKK,
    "/info/kkk"
  ) as MetaDescriptor[];
};

interface TopicInfo {
  id: string;
  title: string;
  answer: string;
}

const topicsInfo: TopicInfo[] = [
  {
    id: "turvalisus",
    title: "Turvalisus merel",
    answer:
      "Turvalisusele merel pööratakse laagris väga suurt tähelepanu. " +
      "Kohe laagrivahetuse algul tehakse noortele selgeks merereeglid ja nendest kinnipidamist jälgitakse erilise tähelepanuga. " +
      "Laste turvalisust merel jälgitakse merel viibimise ajal nii merelt kui maalt. Kõik laagrikasvatajad on saanud vastava väljaõppe."
  },
  {
    id: "toitlustamine",
    title: "Toitlustamine",
    answer:
      "Laagris toitlustatakse kolm korda päevas: hommikuks reeglina puder ja võileib; lõunaks supp, praad ja magustoit; õhtuks praad. " +
      "Joogiks sõltuvalt toidust morss, tee, piim või keefir. Joogivesi on saadaval kogu aeg. " +
      "Laagrit toitlustab MR Grill OÜ (Paldiski lõunasadamas asuva söögikoha ametlik toitlustaja)."
  },
  {
    id: "tervis",
    title: "Terviserike või õnnetusjuhtum",
    answer:
      "Esmaabi tagame laagris kohapeal (kõik täiskasvanud on saanud vastava väljaõppe) ja kui vaja, toimetatakse laps Tallinnasse EMOsse. " +
      "Sel juhul võetakse kindlasti ka laagrikasvandiku kontaktisikuga ühendust. " +
      "Laagrikasvandiku erivajadustest palume kindlasti informeerida laagrijuhatajat ja vajalikud ravimid peavad olema kindlasti endal kaasas."
  },
  {
    id: "ujumisoskus",
    title: "Ujumisoskus",
    answer:
      "Ujumisoskus on soovituslik (vähemalt 50 meetrit). " +
      "Alati on võimalus ujuda päästevestiga."
  },
  {
    id: "purjetamisoskus",
    title: "Purjetamisoskus",
    answer:
      "Eelnev purjetamisoskus ei ole vajalik. " +
      "Kui kasvandikul jagub huvi ja soovi, saab kõikide laagris olevate meresõiduvahendite kasutamise selgeks laagrivahetuse jooksul."
  },
  {
    id: "osalustasu",
    title: "Osalemistasu tagasimaksmine",
    answer:
      "Kui laps lahkub laagrist enne vahetuse lõppu laagrist mitteolenevatel põhjustel, me osalemistasu tagasi ei maksa, sest oleme lapse osalemisega arvestanud."
  }
];

export default function FAQInfoRoute(): JSX.Element {
  const faqs: JSX.Element[] = topicsInfo.map((q: TopicInfo) => (
    <section key={q.id} className="c-section" id={q.id}>
      <div className="o-container">
        <h3 className="c-section-heading">{q.title}</h3>
        <p>{q.answer}</p>
      </div>
    </section>
  ));
  return <main>{faqs}</main>;
}
