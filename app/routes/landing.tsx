import type { LinksFunction, MetaDescriptor, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import type { ReactElement } from "react";
import React, { Fragment, useState, useRef, createRef, RefObject } from "react";

import Sponsors from "~/components/sponsors";
import NavBar from "~/components/nav-bar";

import MetaConstants from "~/utils/meta-constants";
import { genMetaData } from "~/utils/metagen";

import type { QuickLink } from "~/hcdb";
import { LANDING_SUBTEXT, LANDING_TAGLINE, landingQuickLinks, YEAR } from "~/hcdb";
import Footer from "~/components/footer";
import { prisma } from "~/db.server";

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.LANDING, "") as MetaDescriptor[];
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
  }
];

interface PromoContent {
  title: string;
  description: string;
  img?: ReactElement;
  video_mp4?: string;
  video_webm?: string;
}

const promoContent: PromoContent[] = [
  {
    title: "Laoküla merelaager",
    description:
      "Suurepärane võimalus 8–16aastastel merehuvilistel veeta suvi looduskaunis kohas mere kaldal.",
    video_webm: "/img/landing/introduction.webm",
    video_mp4: "/img/landing/introduction.mp4"
  },
  {
    title: "Eelnev merekogemus pole oluline",
    description:
      "12päevase laagrivahetuse jooksul võib selgeks saada nii purjetamise, sõudmise kui ka muude meresõiduvahendite kasutamise algtõed.",
    video_webm: "/img/landing/sailing.webm",
    video_mp4: "/img/landing/sailing.mp4"
  },
  {
    title: "Ja siis, kui merele ei saa",
    description:
      "Merelaagri õhtuid ja ka tormipäevi sisustavad tavapärased laagri tegevused – lõkkeõhtud, diskod, matkad ja mitmesugused võistlused.",
    video_webm: "/img/landing/freetime.webm",
    video_mp4: "/img/landing/freetime.mp4"
  }
];

const CTASection = () => {
  return (
    <section className="c-cta">
      <div className="c-cta__block read-more">
        <div className="read-more__wrapper">
          <h3 className="c-section-heading">
            <Link to="info/">Kiirlingid</Link>
          </h3>
          <ul className="c-cta__links">
            <li>
              <Link to="info/vahetused/">Vahetuste ajad</Link>
            </li>
            <li>
              <Link to="info/maksmine/">Hinnad</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="c-cta__block map">
        <h3 className="c-section-heading t-white">
          <Link to="info/laagrist/#asukoht">Asukoht</Link>
        </h3>
      </div>
    </section>
  );
};

const PromoSectionCards = () => {
  const [videoProgress, setVideoProgress] = useState(Array(promoContent.length).fill(0));
  const vidRef = useRef(promoContent.map(() => createRef()));

  const setProgress = (idx: number, e: React.SyntheticEvent) => {
    let video = e.target as HTMLVideoElement;
    if (isNaN(video.duration))
      return;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(prevProgress => {
        const newProgress = [...prevProgress];
        newProgress[idx] = progress;
        return newProgress;
      });
    }
  };

  const playPauseVideo = (idx: number) => {
    const video = vidRef.current[idx].current as HTMLVideoElement;
    if (video.paused) video.play();
    else video.pause();
  };

  const promoSections = promoContent.map((content, idx) => {
    let classes = "c-home-block";
    if ((idx & 0x01) !== 1) classes += ` ${classes}--inverted`;
    return (
      <div key={idx} className={classes}>
        <div className="c-home-block-media">
        <video
          ref={vidRef.current[idx] as RefObject<HTMLVideoElement>}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={(e) => setProgress(idx, e)}
          onClick={() => playPauseVideo(idx)}>
          <source src={content.video_mp4} type="video/mp4"></source>
          <source src={content.video_webm} type="video/webm"></source>
        </video>
        <progress className="progressbar" id={`progress_${idx}`} max="100" value={videoProgress[idx]}/>
        </div>
        <div className="c-home-block-body">
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </div>
      </div>
    );
  });

  return <Fragment>{promoSections}</Fragment>;
};

const PromoSection = () => {
  return (
    <section className="c-section">
      <PromoSectionCards />
      <div className="c-home-block c-home-block--center">
        <div className="c-home-block-body">
          <h3>Pole merelaagrit ilma seltskonnata</h3>
          <p className="u-mb-15">
            Ühes laagrivahetuses puhkab 40 noort ja laagrielu korraldavad viis
            vastava väljaõppe saanud kasvatajat.
          </p>
          <p className="u-mb-15">
            {/*Laoküla merelaagrit korraldati {YEAR}. aasta suvel{" "}
            {YEAR - 1998}. korda.*/}
            Laoküla merelaagrit korraldati 2024. aasta suvel 26. korda.
          </p>
        </div>
        <div className="c-home-block-media">
          <iframe
            title="Merelaagri reklaamvideo"
            className="c-landing__video"
            src="https://www.youtube-nocookie.com/embed/Lnd8R-ObntU"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>Filmi autor: Raiko Sagur</p>
        </div>
      </div>
    </section>
  );
};

export const loader = async () => {
  const dbTagline = await prisma.generalInfo.findUnique({
    where: { key: "tagline" }
  });
  const dbSubtext = await prisma.generalInfo.findUnique({
    where: { key: "subtext" }
  });

  const tagline = dbTagline ? dbTagline.value : null;
  const subtext = dbSubtext ? dbSubtext.value : null;

  return { tagline, subtext };
};

const Hero = () => {
  const { tagline, subtext } = useLoaderData<typeof loader>();

  const quickLinks = landingQuickLinks.map((link: QuickLink) => (
    <li key={link.href}>
      <Link to={link.href}>{link.content}</Link>
    </li>
  ));

  return (
    <section className="c-landing-hero c-section">
      <NavBar inverted={true} />
      <div className="c-landing-hero__content">
        <h1 className="">{tagline ?? LANDING_TAGLINE}</h1>
        <h2 className="">{subtext ?? LANDING_SUBTEXT}</h2>
        <ul className="c-landing-quickies">{quickLinks}</ul>
      </div>
      <img
        alt=""
        className="c-landing-waves"
        src="/img/landing/sea_waves.svg"
      />
    </section>
  );
};

export default function Index() {
  return (
    <Fragment>
      <main>
        <div className="c-landing-overlay"></div>
        <Hero />
        <PromoSection />
        <CTASection />
      </main>
      <Sponsors />
      <Footer />
    </Fragment>
  );
}
