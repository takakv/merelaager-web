import { Fragment } from "react";
import type { MetaDescriptor, MetaFunction } from "@remix-run/node";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

import type { TeamMember } from "~/hcdb";
import { mainMembers, retiredMembers } from "~/hcdb";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.MEESKOND,
    "/meeskond"
  ) as MetaDescriptor[];
};

interface TeamMembersProp {
  members: TeamMember[];
}

const TeamMembers = ({ members }: TeamMembersProp) => {
  const teamMembers: JSX.Element[] = members.map((member, idx) => {
    const getAchievements = (achievements: string[]): null | JSX.Element => {
      if (achievements.length === 0) return null;
      const achievementList: JSX.Element[] = achievements.map(
        (achievement, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <br />}
            {achievement}
          </Fragment>
        )
      );
      return <p>{achievementList}</p>;
    };

    return (
      <section key={idx} className="c-section c-section--crewmate">
        <div className="o-container">
          <h3 className="c-section-heading">{member.name}</h3>
          <p>{member.description}</p>
          {getAchievements(member.achievements)}
        </div>
      </section>
    );
  });

  return <Fragment>{teamMembers}</Fragment>;
};

export default function TeamRoute() {
  return (
    <main>
      <TeamMembers members={mainMembers} />
      <div className="c-breaker" />
      <TeamMembers members={retiredMembers} />
    </main>
  );
}
