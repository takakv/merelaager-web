import { InfoBanner } from "~/components/banners";
import type { MetaDescriptor, MetaFunction } from "react-router";
import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.ISIKUANDMED,
    "/isikuandmed"
  ) as MetaDescriptor[];
};

export default function PIILegalRoute() {
  return (
    <main>
      <section className="c-section c-section--legal">
        <div className="o-container">
          <h3 className="c-section-heading">Isikuandmete töötlemine</h3>
          <p>Viimati täiendatud: 5. detsember 2020</p>
          <h4>
            Mida me peame <q>isikuandmeteks</q>?
          </h4>
          <p>
            Meie jaoks on <q>isikuandmed</q> teave (nt nimi või isikukood),
            mille abil tuvastame isiku (nt lapsevanema või laagrilapse).
          </p>
          <p>
            Kogu teave, mida isikuandmed ei hõlma, on{" "}
            <q>isikuga mitteseotud andmed</q>.
          </p>
          <p>
            Kui talletame isikuandmeid koos andmetega, mis ei ole isikuandmed,
            käsitleme seda andmekombinatsiooni isikuandmetena. Kui eemaldame
            andmekogumist isikuandmed, ei pruugi me eemaldada isikuga
            mitteseotud andmete osa.
          </p>
          <h4>Mida teeme teie andmetega?</h4>
          <p>
            Kui edastate meile oma andmed, kasutame neid vaid viisidel, mis
            ühtivad käesoleva privaatsuspoliitikaga. Peamised otstarbed on
            laagrilastest ja nende kontaktisikutest ülevaate saamine ning
            noorsootöö ja laagriseadusega kooskõla tagamine.
          </p>
          <p>
            Andmed, mida vajame statistikaks (nt vanus või päritolu maakond),
            anonüümime enne kasutamist.
          </p>
          <h4>Millal jagame teie andmeid teistega?</h4>
          <p>
            Teie usaldus on meie jaoks tähtis, seega jagame teie andmeid vaid
            järgnevatel põhjustel:
          </p>
          <ul>
            <li>
              Jagame andmeid organisatsiooni sees ja sel juhul vaid neid, mis on
              vajalikud (nt juhatajad omavahel või noorsootöö asutustele
              aruannete kirjutamisel).
            </li>
            <li>
              Jagame andmeid, kui seadused seda kohustavad. Kui saame mõnelt
              riigiasutuselt teiega seotud päringu või kui päring on seotud
              kohtuprotsessiga, järgime alati seadusi. Sellistel juhtudel anname
              sellest teile või lapse kontaktisikule teada, kui see pole
              seadusega keelatud.
            </li>
            <li>
              Jagame andmeid, kui usume, et seda on vaja teie või kellegi teise
              kahjustamise vältimiseks (nt meditsiinilise erikorra puhul). Neil
              puhkudel anname sellest kas teile või lapse kontaktisikule teada.
            </li>
          </ul>
          <h4>Kuidas talletame ja kaitseme teie isikuandmeid?</h4>
          <p>
            Meie jaoks on väga oluline teilt saadud isikuandmete kaitsmine ja
            rakendame selle tagamiseks nii organisatsioonilisi kui ka tehnilisi
            turbemeetmeid. Lähtume teadmisvajaduse põhimõttest. Teisisõnu
            pääsevad teie andmetele ligi vaid need, kellel on andmete vajamiseks
            mõjuv põhjus (nt vahetuse juhataja) ja kes teevad seda vaid otstarbe
            alusel.
          </p>
          <p>
            Kui vaatamata meie pingutustele ilmneb mõni turbemeetme rikkumine,
            anname teile sellest teada ja teeme kõik endast oleneva, et olukorda
            parandada.
          </p>
          <p>
            Me ei soovi hoida teie isikuandmeid kauem, kui meil neid vaja on,
            seega säilitame neid vaid senikaua, kuni oleme täitnud eesmärgi,
            mille jaoks neid andmeid kogusime. Kui meil pole teie andmeid enam
            tarvis, siis eemaldame need laagri andmekogumist.
          </p>
          <InfoBanner>
            Osa andmeid, näiteks lapse nimi ja merelaagris käidud aastate arv,
            säilitame laagri arhiivi tarbeks.
          </InfoBanner>
        </div>
      </section>
    </main>
  );
}
