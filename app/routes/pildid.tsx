import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import Email from "~/components/email";
import { JSX } from "react";

const picturesList: string[] = [
  "Kati_052.JPG",
  "Kati_073.JPG",
  "Kati_171.JPG",
  "Martin_030.webp",
  "Martin_055.webp",
  "Martin_123.webp",
  "tk_ilmutatud_008.webp",
  "tk_ilmutatud_059.webp",
  "Kati_067.JPG",
  "Kati_103.JPG",
  "Martin_023.webp",
  "Martin_032.webp",
  "Martin_103.webp",
  "Martin_130.webp",
  "tk_ilmutatud_054.webp"
];

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.PILDID, "/pildid") as MetaDescriptor[];
};

export default function PicturesRoute() {
  const pictures: JSX.Element[] = picturesList.map((picture) => (
    <img key={picture} src={`/img/gallery/${picture}`} />
  ));

  return (
    <main className="pildid">
      <div className="o-container">
        <p>Hetki laagrielust.</p>
        <div className="o-masonry">{pictures}</div>
        <div className="u-banner u-banner--info">
          <p>
            Kui otsite kindla aasta/vahetuse pilte, saatke oma küsimus julgelt
            aadressile <Email username="taaniel" />.
          </p>
        </div>
      </div>
    </main>
  );
}
