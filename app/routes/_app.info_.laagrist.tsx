import { Link } from "@remix-run/react";
import { Fragment } from "react";
import type { MetaDescriptor, MetaFunction } from "@remix-run/node";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import { InfoBanner } from "~/components/banners";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.INFO_ELU_LAAGRIS,
    "/info/laagrist"
  ) as MetaDescriptor[];
};

const LocationSection = () => {
  return (
    <section className="c-section" id="asukoht">
      <div className="o-container">
        <h3 className="c-section-heading">Laagri asukoht ja kogunemine</h3>
        <p>Laager asub Harju maakonnas Lääne-Harju vallas Laoküla külas.</p>
        <p>
          Laagrisse saab tulla ühiskogunemisel rongiga või ise autoga kohale
          tulla.
        </p>
        <p className="u-mt-1em">
          <b>Juhised rongiga tulijale:</b> Kogunemise kellaja täpsustame neli
          päeva enne vahetuse algust. Kogunemine toimub Balti jaamas Paldiski
          rongi perroonil.
        </p>
        <p>
          Piletiraha peab lapsel kaasas olema. Balti jaamas võtab lapsed vastu
          laagri kasvataja. Elroni piletiinfo leiate{" "}
          <Link
            className="t-visible"
            to="https://elron.pilet.ee/et/otsing/Tallinn/Laok%C3%BCla"
            target="_blank"
            rel="noreferrer"
          >
            siit
          </Link>
          .
        </p>
        <p className="u-mt-1em">
          <b>Juhised autoga tulijale:</b> Sõitke Paldiski poole. Lõunasadama
          ristmikult (Alexela bensiinijaama juurest) keerake vasakule.
          Järgmiselt ristmikult jälle vasakule Madise poole. Peatselt näete tee
          ääres Laoküla silti ja siis kohe merelaagri viita. Meieni viib tee
          läbi rannakarjamaa, kust on meid juba mere ääres näha.
        </p>
        <p className="u-mt-1em">Kui tee peal hätta jääte, helistage meile!</p>
        <iframe
          title="Merelaagri asukoht"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54753.2513076819!2d24.07959290554487!3d59.33662882458193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692a67d0aedaf5b%3A0x98e42c9d1a0c68!2sMere%20laste%20suvelaager!5e0!3m2!1sen!2sus!4v1606061390008!5m2!1sen!2sus"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
        ></iframe>
      </div>
    </section>
  );
};

const checklistList: string[] = [
  "Magamiskott ja padjapüür",
  "Hügieenitarbed, saunalina ja rätik",
  "Isiklik nimeline korduvkasutatav veepudel",
  "Vihmakindlad riided ja jalanõud",
  "Ujumisriided ja jalanõud vees käimiseks kivisel põhjal (rannasussid)",
  "Peakate",
  "Soe kampsun ja villased sokid",
  "Sportlikud riided ja jalanõud",
  "Taskulamp ja varupatareid",
  "Päikesekaitsevahendid",
  "Hea tuju!!!",
];

const ChecklistSection = () => {
  const checklist: JSX.Element[] = checklistList.map((el, idx) => (
    <li key={idx}>{el}</li>
  ));
  return (
    <section className="c-section" id="laagrisse-kaasa">
      <div className="o-container">
        <h3 className="c-section-heading">Laagrisse kaasa</h3>
        <ul>{checklist}</ul>
        <p className="u-mt-1em">
          Riideid valides arvestage Eestimaa merelise kliimaga, kus esineb nii
          päikest kui äikest!
        </p>
      </div>
    </section>
  );
};

const activityList: string[] = [
  "8.30 – laagri äratus",
  "8.45 – rivistus ja lipu heiskamine",
  "8.50 – hommikujooks ja -võimlemine",
  "9.30 – hommikusöök",
  "9.30 – koristamine, toimkond, valmistumine merele minekuks",
  "10.00 – tegevus maal või merel",
  "13.00 – valmistumine lõunasöögiks",
  "13.30 – lõunasöök",
  "Admirali tund",
  "14.45 – valmistumine merele minekuks",
  "15.00 – tegevus maal või merel",
  "18.00 – merelise tegevuse lõpetamine",
  "19.00 – õhtusöök",
  "19.30 – lõkkeõhtu, mängud, viktoriinid, võistlused, disko",
  "22.30 – rivistus, lipu langetamine (sõltuvalt päikeseloojangust)",
  "pesemine, valmistumine magama minekuks",
  "23.00 – öörahu",
];

const ScheduleSection = () => {
  const activities: JSX.Element[] = activityList.map((activity, idx) => (
    <Fragment key={idx}>
      <p>{activity}</p>
    </Fragment>
  ));
  return (
    <section className="c-section" id="kava">
      <div className="o-container">
        <h3 className="c-section-heading">Päevakava</h3>
        {activities}
        <p className="u-mt-1em">
          Päevakava võib muutuda ilma või muude asjaolude tõttu.
        </p>
      </div>
    </section>
  );
};

const rulesList: string[] = [
  "Laagris ei ole lubatud kiusamine ja muu vägivald ning varastamine.",
  "Laager ei vastuta kaasa võetud elektrooniliste vidinate ja väärisesemete eest.",
  "Telefone soovitame laagrisse mitte kaasa võtta.",
  "Laagris viibijad on kohustatud täitma laagri kodukorda, päevakorda, juhataja ja kasvatajate korraldusi.",
  "Laagri territooriumilt lahkumine on lubatud ainult laagri juhataja loal.",
  "Kui lapsel on terviseprobleeme, tuleb sellest juhatajale kirjalikult teada anda enne laagri algust.",
  "Kui laps tekitab tahtlikku materiaalset kahju, korvab selle lapse vanem või hooldaja.",
  "Kui laps loobub laagrikohast vähem kui kuu aega enne vahetuse algust, me broneerimistasu tagasi ei maksa.",
  "Kui laps loobub laagrikohast ja me ei leia asendusliiget, ei maksa me tagasi ei broneerimistasu ega laagritasu.",
  "Kui laps lahkub laagrist enne vahetuse lõppu laagrist mitteolenevatel põhjustel, me osalemistasu tagasi ei maksa, sest oleme lapse osalemisega arvestanud.",
  "Lapsi pildistatakse laagris ja pilte võidakse avaldada meedias, kodulehel ja sotsiaalmeedias. Juhul, kui te ei soovi, et merelaager lapsest pilte avaldaks, palun andke sellest juhatajale enne laagri algust kirjalikut teada.",
  "Kui meil on alust kahtlustada, et lapse käes on keelatud aineid või esemeid, on kasvatajatel õigus lapse isiklikud asjad läbi vaadata.",
];

const RulesSection = () => {
  const rules: JSX.Element[] = rulesList.map((rule, idx) => (
    <li key={idx}>{rule}</li>
  ));
  return (
    <section className="c-section" id="kodukord">
      <div className="o-container">
        <h3 className="c-section-heading">Kodukord</h3>
        <ul>{rules}</ul>
        <h4 className="u-mt-1em">Laagrisse on keelatud kaasa võtta:</h4>
        <ul>
          <li>alkohoolseid ja energiajooke,</li>
          <li>tubakatooteid,</li>
          <li>narkootilisi ja toksilisi aineid,</li>
          <li>pürotehnilisi ja tuleohtlikke aineid ja vahendeid, relvi,</li>
          <li>
            ravimeid (v.a retseptiravimid, mis on kantud tervisetõendile).
          </li>
        </ul>
        <p className="u-mt-1em">
          Hoiule võetud keelatud ained ja asjad (v.a narkootilised ained) anname
          laagri lõpus lapsevanemale.
        </p>
        <p>Alkojoobe tuvastame alkomeetriga kahe kasvataja juuresolekul.</p>
        <p>
          Kui meil on alust kahtlustada, et laps kasutab laagrivahetuse ajal
          keelatud aineid, anname sellest vanematele teada. Vajadusel teavitame
          politseid.
        </p>
        <InfoBanner>
          Kui laps rikub kodukorda, on juhatajal õigus laps laagrist ära saata.
          Sellisel juhul on lapse vanemal või hooldajal kohustus lapsele järele
          tulla. Laagritasu me ei hüvita.
        </InfoBanner>
      </div>
    </section>
  );
};

export default function CampInfoRoute() {
  return (
    <main>
      <LocationSection />
      <ChecklistSection />
      <ScheduleSection />
      <RulesSection />
    </main>
  );
}
