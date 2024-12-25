import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.AJALUGU, "/ajalugu") as MetaDescriptor[];
};

export default function HistoryRoute() {
  return (
    <main>
      <section className="c-section c-section--history">
        <div className="o-container">
          <h3 className="c-section-heading">
            Noorte Meremeeste Klubi ajaloost
          </h3>
          <p>
            Mis koht see Noorte Mereklubi on? Mereleksikon ütleb:
            merendushuvilisi noori ühendav lasteklubi, asutatud 1972. a.
          </p>
          <p>
            Noorte Mereklubisse on koondunud merealaste huvidega noored.
            Ringitegevuse kaudu saavad nad uusi teadmisi. Olulisel kohal on
            omavaheline suhtlemine ja erinevad ettevõtmised.
          </p>
          <p>
            1955.a. tegutses Tallinna Pioneeride Majas (Aia tn 12)
            tehnikaosakonna juures merehuviliste noorte erialaring, Olev Eensalu
            juhendamisel.
          </p>
          <p>
            1956.a. veebruarikuust alustas meremudelismi ring. Valmistati
            lihtsate tööriistadega sadama makett, kus paiknesid laevade mudelid.
            Nõnda algaski töö, kus esimesteks abilisteks olid nuga ja
            liivapaber.
          </p>
          <p>
            Sama aasta mais tehti esimene tutvus ALMAVÜ Mereklubi jahiga
            „Aurora“, mille kapteniks Olev Eensalu. Suve jooksul seilati selgeks
            Tallinna lahe veed. Noorte ajalehes „Säde“ ilmus üleskutse kõigile
            noortele osaleda merenduslikus tegevuses Tallinna Pioneeride Majas.
            Poisse ja tüdrukuid kutsuti peagi loodavasse Noorte Meremeeste
            Klubisse. 1956.a. novembrikuu 11. päeval loodi Tallinna Pioneeride
            Maja juurde Noorte Meremeeste Klubi. Klubi asutajaks sai noor
            energiline purjesportlane Olev Eensalu. Kogunes üle 200 õpilase
            kõikidest pealinna koolidest. Aukülalisteks olid Tallinna Merekooli
            õppejõud Hermann Tõnissoo, purjejahtide konstruktor Paul Budde,
            purjesportlane Enn Metsar, mootorlaeva „Jarensk“ kapten Harri
            Liidemann, luuletaja Manivald Kesamaa ja helilooja Boris Kõrver,
            kelle koostööna valmis Noorte Meremeeste Klubile laul „Ehkki
            kutsutakse juba pootsmaniks mind“. Noorte Meremeeste Klubi ülemaks
            valiti Olev Eensalu.
          </p>
          <p>
            1957. ja 1958. aastad möödusid Noorte Meremeeste Klubis töörohkelt
            ja huvitavalt. Talvel õpiti meretarkusi ja ehitati laevamudeleid,
            suvel tehti õppesõite ALMAVÜ mereklubi purjejahtidel „Aurora“ (5,5
            SR-21) kapteniks Olev Eensalu ja „Aegna“ (DSR), kapteniks Uno
            Seiler. Täienes ka klubi oma laevastik, meremehed andsid klubile üle
            tõelise merekaatri, päris laeva kohe. Tehti pikemaid mereretki
            Prangli saarele, Haapsallu, Hiiumaale ja mujale. Suursündmuseks
            kujunes purjeretk Moskvasse, marsruudil Tallinn- Leningrad- Laadoga
            järv- Oneega järv- Rõbinski veehoidla- Moskva- Volga kanal- Moskva
            ja tagasi Tallinna.
          </p>
          <p>
            Lõplikult töötati välja klubi põhikiri, klubi sai oma lipu,
            rinnamärgi ja embleemi, hakati välja andma klubi liikmepileteid.
            1959.a. septembris jätkus Tallinna Pioneeride Palees tegevus noorte
            merehuvilistega. Moodustati kuus õppegruppi, kuhu kuulusid 90
            poissi-tüdrukut. Õppegruppide tööd hakkas juhendama Tõnu Meltsas
            (sünd. 1934), kes oli 1958.a. lõpetanud Leningradi Merekooli
            veetranspordi insenerina ja suunatud Tallinna Pioneeride Paleesse.
          </p>
          <p>
            1960.a. suvel sooritati paadimatk „jollidel“ (kolmel kuueaerulisel
            merepaadil) mööda Eesti veekogusid. Kuu ajaga sõideti Oiult Narvani
            (Oiu küla on Võrtsjärve põhjatipus Valma ja Leiu vahel).
          </p>
          <p>
            1961.a. novembris asutati ENSV Pioneerinõukogu otsusega Tallinna
            Pioneeride Palee juurde uus Meremeeste Klubi, juhendajaks sai Tõnu
            Meltsas.
          </p>
          <p>
            1963.a. moodustati lisaks paadijuhtide erialaringidele veel
            motoristide ja signalistide erialaringid ja koliti pioneeride Palee
            keldrikorruselt piritale. Klubi sai baaslaevaks 15-meetri pikkuse
            puidust kerega kaatri SBR-107 (oli klubi valduses kuni 1971.
            aastani). 1964.a. augustis anti klubile sõjalaevastiklaste poolt üle
            1953.a. Soomes ehitatud endine hülgepüügikuunar „Bakan“, mis ristiti
            „Jungaks“. Meresõidud ulatusid nüüd juba Pärnuni (laev sõitis klubi
            õppelaevana, hiljem baaslaevana 1972. aastani). Poisse tüdrukuid
            tegutses klubis juba ligi 200.
          </p>
          <p>
            1965.a. suvel said noored meremehed tõelise merepraktika õppelaeval
            „Junga“ (meeskonnas Vahter, Meriväli, Nipper). Juulikuus toimus
            telklaager Pärnumaal Reiu jõe ääres.
          </p>
          <p>
            Sama aasta sügisel andis Riiklik Merelaevandus klubile
            õppe-baaslaevaks 1921.a. Eestis ehitatud mootorpurjeka „Läänemaa“
            (700 brt). Laevale ehitati õppeklassid ja tööruumid. Õpilaste
            koguarv klubis oli kasvanud juba 500-ni, kellest enamus olid poisid
            (Rätsep).
          </p>
          <p>
            1966.a. talvel toimusid „Läänemaa“ pardal huvialade teoreetilist
            laadi õppused, suvel aga harjutati noori merega tutvust tegema
            õppelaeval „Junga“ (meeskonnas T. Vahter, K. Helvik ja A. Juhanson).
          </p>
          <p>
            Aastal 1972 sai klubi ametliku staatuse ja nime – Eesti NSV
            Vabariiklik Noorte Meremeeste Klubi. Aastate jooksul vahetas klubi
            korduvalt nime – Eesti NSV Noorte Meremeeste Klubi, Eesti NSV Noorte
            Mereklubi, Eesti Noorte Mereklubi. Klubil olid filiaalid Viljandis,
            Toilas ja Orissaares ning mitu sõsarklubi.
          </p>
          <p>
            1994 aastal osales 16 erialaringis (laevajuhtimise, laevamehaanika,
            raadioside, raadiotehnika, laevamudelism, veemootorisport,
            allveesport, merebioloogia, purjetamine, hüdrograafia,
            hüdrometeoroloogia, kalapüük, kalatöötlemine ja riigikaitse) 700
            õpilast, pedagooge oli 42. Klubi liikmed on püstitanud
            maailmarekordeid veemootorispordis (1972 L. Aaslav-Kaasik, 1975 T.
            Mets) ja võitnud NSV Liidu meistrivõistluste medaleid
            mudellaevanduses ja veemootorispordis. Klubil oli 3 merelaeva
            (“Suurlaid”,”Juku” ja “Junga”), millest igaüks võis meresõidule viia
            20 õpilast (ujuvvahendeid oli üldse 59). Praktiliste meresõitude
            korraldamiseks oli suvelaager Simistes Muhus. Klubi laevad
            külastasid Rostocki, Stralsundi ja Warnemünde sadamat Saksamaal.
            1994 aasta juunist kuulus klubi Eesti Merehariduskeskusele.
          </p>
          <p>
            Viimastel aastatel on noorte meremeeste harrastus nagu kogu
            merehariduski olnud tõmbetuules. Klubi on korduvalt vahetanud
            alluvust. Kõik see on jätnud omad jäljed. Kunagisest
            ülevabariigilisest klubist on järgi jäänud mõned merendusringid.
          </p>
          <p>
            2000. aasta 13. jaanuaril otsustas Tallinna Volikogu taotleda Linna
            omandusse seni Haridusministeeriumile kuulunud Eesti Noorte
            Mereklubi valduses oleva vara ja anda see Tallinna Noorsooameti
            valitsemisele (Haridusministeerium 2000, Tallinna Linnavolikogu
            otsus 2000). Sama aasta jaanuaris klubi likvideeritigi ja asemele
            tuli Avatud Noortekeskus “Tallinn”, mille juures tegutsesid ka
            mereringid (Järve 2000). Kuid erinevatel põhjustel pandi küsimärgi
            alla kogu ettevõtmise mõttekus. 2001. aasta 30.mail lõpetati kogu
            tegevus.
          </p>
          <p>
            Merendusringide vajalikkuses tänu Eesti Mereakadeemiale siiski ei
            kaheldud (Tohver 2000). 28. septembril 2001.a. kirjutati Eesti
            Mereakadeemia ja Tallinna Spordi- ja Noorsooameti poolt alla
            koostööleping. Lepingukohaselt tagab Tallinna linn merendusringidele
            ruumid ja Eesti Mereakadeemia tagab kvaliteetse õppe- ja
            huvitegevuse.
          </p>
          <p>
            2002.a. anti huviringide korraldamine üle MTÜ Noorte Mereklubile.
            Klubis tegutses nüüd 180 noort ja ringe oli viis: laevamudelismi-,
            veemoto-, motoristide-, madruste- ja jungadering. Klubis käisid koos
            ka merenoorkotkad.
          </p>
          <p>Tänasel päeval on säilinud veemoto ringi tegevus.</p>
          <img src="/img/historical/muskliharjutus.jpg" alt="Muskliharjutus" />
        </div>
      </section>
      <section className="c-section c-section--history">
        <div className="o-container">
          <h3 className="c-section-heading">Noorte merelaagri ajaloost</h3>
          <p>
            Noorte meremeeste õppelaagritel on pikaajaline taust. Sai selgeks,
            et sellistel laagritel on teiste noortelaagrite hulgas kindel koht.
            Huviliste puuduse üle polnud kunagi kurta saanud, pigem vastupidi –
            kõikidele huvilistele ei jätku kohti.
          </p>

          <p>
            Esimene laager toimus 1965.a. suvel Pärnu maakonnas Reiu jõe ääres.
            Laagril oli kaks vahetust, kumbki kestis 20 päeva.Elati telkides ja
            jõel sõideti puust jollidega.
          </p>

          <p>
            1967.a. juulis baseerus laager Paatsalu lahe ääres Illuste neeme
            tipus. Merel sõideti jollide ja mootorpaatidega. Laagrit külastasid
            ka Helsingi mereskaudid. 1968.a. käidi merematkadel Kessulaiul ja
            Ruhnus. Merelaagrid Illustes toimusid 1967 – 1971.a.
          </p>

          <p>
            1972.a. kolis merelaager üle Muhu saarele Simistesse. Baashooneks
            sai endine Simiste koolimaja. Ühes laagri vahetuses oli umbes 70
            last. Elati telkides. Selleks olid kasutusel 10 kohalised
            sõjaväetelgid. Telklaager toimis aastail 1972 – 1980. Koolimajast
            kahe kilomeetri kaugusel asus rannalaager. Seal olid 25 purjekat, 9
            sõudepaati ja 4 mootorpaati. Päevane laagriliste tegevus toimus
            rannas, ööseks jäi randa vaid rannavaht.
          </p>
          <p>
            1978.a. alustati suure rannamaja ehitust ja asukad kolisid sisse
            1981.a. Samal suvel kolis laager üle randa – Rässa lahe äärde.
            Koolimajja jäid köök, söökla ja arsti kabinet.
          </p>
          <p>
            Suve jooksul toimus kolm 13-e päevast laagrivahetust. Ühes vahetuses
            oli ligikaudu 90 last. Paralleelselt laagriga tegid õppesõite ka
            klubi õppelaevad. Laagri ametlikuks nimetuseks oli sõjalis-sportlik
            merelaager.
          </p>
          <p>
            Laagri tarbeks oli ette nähtud 17 töötajat ja 10%-le laagri lastele
            oli õigus välja anda tasuta tuusikuid.
          </p>
          <p>
            Laager likvideeriti 1989.a. seoses Muhu vallavalitsuse otsusega teha
            Simiste koolimajja kasukatööstus.
          </p>
          <p>
            Laagri likvideerimine tekitas tühiku noorte suvisesse tegevusse.
            Paraku kõik noored ei mahtunud laevadele ja see peletas paljud
            noored klubist eemale. Simiste Merelaagrist on läbi käinud väga suur
            arv noori ja siiani meenutavad laagrit endised noored meremehed seda
            laagrit vaid hea sõnaga. 1998-l aastal otsustas seltskond endisi
            noori meremehi teha ära midagi konkreetset ja nii loodigi MTÜ Noorte
            Mereklubi. MTÜ Noorte Mereklubi eesmärgiks sai Merelaagri
            korraldamine. Täpselt 10 aastat peale Simiste Merelaagri sulgemist
            hakkas tegutsema Laoküla Merelaager. Kuna laagri korraldajateks ja
            ka läbiviijateks on Simiste Merelaagri kasvandikud, siis järgitakse
            väga täpselt Simiste laagri korraldust ja traditsioone. Laager on
            osutunud vägagi populaarseks mitte ainult noorte meremeeste hulgas
            vaid ka teiste merehuviliste noorte seas. Merendusringkondades
            hinnatakse ja toetatakse laagrit väga – laagrist läbikäinud lapsed
            oskavad väärtustada merd ja meremehe elukutset.
          </p>
          <p>
            <b>1999.a. suvel viidi merelaager esmakordelt läbi Laokülas.</b>
          </p>
          <p>
            1999.a. korraldati Haridusministeeriumi noorsoo ja huvihariduse
            osakonna poolt uurimus ülevaate saamiseks lastelaagrite olukorrast.
            Uurimuse eesmärkideks oli saada ülevaade olmetingimustest laagris
            viibijate arvamuse läbi; saada teada laste arvamus kasvatajatest,
            tegevusprogrammidest, peamistest probleemidest ning kuulda noorte
            hinnangut veedetud ajale; leida infokanalid laagrite reklaamiga
            seoses, mida noored pelgavad enne laagrisse tulekut ning millised on
            laagrisse tulekuga seonduvad transpordiprobleemid. Küsitleti 2364
            noort 50 erinevast laagrist, sealhulgas Laoküla merelaagris
            küsitleti 19 noort. Neist 68% olid poisid ja 31,6% tüdrukud.
            Küsitletute keskmine vanus oli 12,05 eluaastat. Noorimad olid 9- ja
            vanimad 16-aastased. Kõik küsitletud olid eestlased.
          </p>
          <img
            src="/img/historical/noored_meremehed.jpg"
            alt="Noored meremehed"
          />
        </div>
      </section>
      <section className="c-section c-section--history">
        <div className="o-container">
          <h3 className="c-section-heading">
            MTÜ Noorte Mereklubi ja Laoküla merelaager
          </h3>
          <p>
            1998.a. loodi Noorte Meremeeste Klubi endiste kasvandike poolt MTÜ
            Noorte Mereklubi.
          </p>
          <p>
            Klubi eesmärgiks oli taasluua merehuvilistele noortele merelaager.
            Leiti sobiv koht Keila vallas Laokülas, mis asub Paldiski lahe
            kaldal, Väike-Pakri saare vastas. Koht on algajatele purjetajatele
            väga sobilik turvalisuse mõttes. Vajadusel saab abi kutsuda lähedal
            asuvast Paldiski sadamast, kus baseeruvad lootsikaatrid ja
            piirivalve.
          </p>

          <p>
            Laagri ettevalmistus ja läbiviimine toimub MTÜ Noorte Mereklubi
            liikmete poolt. Hoogtöökorras tehakse kõik vajalikud tööd alates
            laagrisuve ettevalmistamisest ja lõpetades paatide remondiga.
          </p>
          <p>
            Esimesel laagrisuvel elasid lapsed sõjaväetelkides, teisel aastal
            juba matkatelkides ja neljandal aastal ehitati neljakohalised
            puitmajakesed.
          </p>
          <p>
            Laagri põhitegevuseks on purjetamine – merel käiakse sõltuvalt
            ilmast kuni kolm korda päevas. Lisaks saab tegeleda veel aerutamise,
            purjelaua sõidu, ujumise ja palju muu veealaste tegevustega. Lisaks
            kohtutakse piirivalve ja kaitsejõudude esindajatega.
          </p>
          <p>
            Laagri kasvatajateks on vabatahtlikud MTÜ Noorte Mereklubi liikmete
            hulgast, kes on läbinud ka laagrikasvataja koolituse. Kuna
            merelaagri tegevus on võrreldes tavalaagriga väga erinev, peab
            merelaagri kasvataja oskama ka purjetada, juhendada tegevust merel,
            tagama turvalisust ja vajadusel oskama osutada igakülgset abi.
          </p>
          <p>
            Turvalisusele pööratakse suurt tähelepanu. Merele lubatakse lapsi
            vaid korralikult kinnitatud päästevestidega. Pidevalt jälgitakse ka
            ilma. Välja on töötatud süsteem paatide kiireks merelt tagasi
            kutsumiseks. Rannas on pidevalt valves rannavalve kasvataja, kes
            jälgib tegevust vees. Kui paadid on merel, on ka seal üks kasvataja
            päästekaatriga.
          </p>
          <p>
            Kuna mereline tegevus on laagris põhitegevus, pööratakse laste ja
            mere suhteid reguleerivatele reeglitele iseäranis tähelepanu.
            Siinkohal oleks sobilik neid lähemalt selgitada.
          </p>
          <p>
            Merele lubatakse ainult soodsa ilma korral (madal laine ja nõrk
            tuul), päästevestidega ja merekorras alustega. Iga laagris osaleja
            saab endale nummerdatud päästevesti, mille eest kannab ta hoolt kuni
            vahetuse lõpuni. Aluse vaatab enne mereleminekut üle rannavalve
            kasvataja ja merelt tagasi saabudes rannavaht. Kõik alusel leitud
            puudused kantakse rannavalve zhurnaali. Mereleminekust peab
            rannavalvele teatama paadivanem, ütlema millise aluse ja millise
            meeskonnaga väljutakse, samuti tuleb registreeruda ka tagasi tulles.
          </p>
          <p>
            Merele tohib minna ainult siis, kui on antud selleks vastav luba
            (laagri rannavalve lipumasti on heisatud roheline lipp) ja merel on
            ka keegi täiskasvanutest. Kõik laagri töötajad oskavad purjetada,
            sõuda, ujuda ja esmaabi anda ning on võimelised seda ka õpetama.
            Enne iga uue vahetuse purjekatega veepeale saatmist tehakse maismaal
            läbi korralik kuivtrenn ning räägitakse merel ettetulevatest
            võimalikest raskustest ja nende ületamisest. Väiksematele lastele
            õpetatakse paadis käitumist lisaks ka nööri otsa seotud alusega
            vöökõrguses vees.
          </p>
          <p>
            Kui esineb merekorra või laagrikorra rängemaid rikkumisi, järgneb
            karistusena merekeeld, mis on kõige raskemaks karistuseks laagris.
            Ujumas käiakse ainult kasvataja loal ja järelvalvel.
          </p>
          <p>
            Traditsioonilised päeva sõlmpunktid äratus, söögikorrad ja öörahu,
            mis pannakse paika kindla, kuid samas küllalt vabadust jätva
            päevakavaga. Mõned tegevused, näiteks hommikune jooks ja võimlemine,
            üritatakse hoida rangelt kohustuslikud, millest pääses vaid arsti
            vabastuse või lausvihma korral. Muu päevakava kujundatakse
            suhteliselt paindlikult ja laste soove arvestavalt, järgides
            põhimõtet — üritus peab olema piisavalt huvitav või arusaadavalt
            möödapääsmatu, et kõik võtaksid osa vabatahtlikult. Tihti aitab huvi
            tekitamisele kaasa väikese võistlusmomendi tekkimine/tekitamine,
            teinekord on aga vaja rõhutada just meeskonnatunnet laste
            individuaalseid võimeid võrdlemata.
          </p>
          <p>
            Üks laste kohustustest on rannavalve. Valvekorra kestvus on 2 tundi,
            valves viibib korraga 2 last aluste mereloleku ajal.
          </p>
          <p>
            Ülesanneteks valves on märkida kellaajaliselt üles kõik merele
            suunduvad ja merelt saabuvad alused, nende meeskond, merel juhtunu
            ja aluse seisukord saabudes; pidev merel olejate jälgimine; merele
            minejate ja saabujate igakülgne abistamine.
          </p>
          <p>
            Kuna laagri põhitegevus on tihedalt seotud ilmaga, pakub laager
            piisavalt tegevust ka halva ilma korral.
          </p>
          <p>
            Noorte jaoks on huvitav koostöö ka Kaitsejõududega. Aastate joosul
            on laagris oma tegemisi tutvustanud nii Rahuoperatsioonide Keskus
            kui ka Lennuvägi. Alati on oodatud ka piirivalvurid koos oma
            tehnilise varustusega. Oodatud on alati ka õppekäik Tallinki laevale
            „Regal Star”, kus lastele tutvustatakse laeva kui niisugust ning
            näidatakse ette kõik kaptenisillast, masinaruumist kuini kambüüsini.
            Aastaid on kestnud ka tore koostöö Eesti Meremeeste Sõltumatu
            Ametiühinguga (EMSA), kelle abil saavad noored meremehehakatised
            teada meremeeste ühtekuuluvuse positiivsetest külgedest. Samuti on
            EMSA toetanud laagrit laevastiku uuendamisel. Aitähh neile kõigile!
          </p>
          <p>
            Laagris toimuvad võistlused viiakse läbi võistkondlikel alustel. See
            annab võimaluse ka noorematele ja nõrgematele. Võistlustel on
            kaasatud kõik laagri kasvandikud. Omavahel võisteldakse sõlmede
            tegemises, viskeliini viskamises, laskmises, jooksus, ujumises,
            saapaviskamises ja laagris õpitu kohta on viktoriin. Samuti on
            võistkondlikud maastikumäng, teatevõistlused ja pallimängud
            (rahvastepall, võrkpall ja jalgpall).
          </p>
          <p>
            Individuaalaladena on purjetamine, aerutamine, ujumine ja laskmine.
            Turniirivõistlused on lauatennisesja koroonas
          </p>
          <p>
            Kõige meeldejäävamaks ürituseks on noorte arvates nooreks meremeheks
            ristimine. Ristitakse ainult esmakordselt merelaagris olnud
            kasvandik.
          </p>
          <p>
            Laagri lõpupoole saabub ootamatult merelt laagrisse Neptun oma
            saatjaskonnaga – näkid ja merekuradid. Välja kutsutakse kõik uued
            laagrisolijad (nii kasvandikud, kui ka kasvatajad) ja nad peavad
            läbi tegema mõned katsed. Seejärel antakse neile pidulikult kätte
            noore meremehe tunnistus. Üritus on väga lõbus ja reeglina ei jää
            kuivaks mitte keegi.
          </p>
          <img src="/img/historical/ml_2000.dib" alt="Merelaager aastal 2000" />
        </div>
      </section>
      <section className="c-section c-section--history">
        <div className="o-container">
          <p>Artikkel:</p>
          <p>
            K. Mellis
            <br />
            Eesti laevanduse aastaraamat 2013
            <br />
            Eesti Meremuuseumi toimetised 2012
          </p>
        </div>
      </section>
    </main>
  );
}
