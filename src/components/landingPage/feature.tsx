import LandingPageSection from "./section";
import { useLoca } from "root/hooks/loca";

export default function Feature() {
  const { localization, language } = useLoca();

  return (
    <div id={"features"}>
      <LandingPageSection variant={"dark"}>
        <div className={"font-bold text-3xl"}>
          {localization.landingPage.body.featureSection.title[language]}
        </div>
        <div className={"my-8 p-4 text-2xl grid grid-cols-3 gap-16"}>
          {localization.landingPage.body.featureSection.featureSet.map((e) => (
            <FeatureSection
              key={e.id}
              title={e.title[language]}
              desc={e.desc[language]}
            />
          ))}
        </div>
      </LandingPageSection>
    </div>
  );
}

interface FeatureSection {
  title: string;
  desc: string;
}

const FeatureSection = ({ title, desc }: FeatureSection) => {
  return (
    <section
      className={
        " rounded-md text-center p-2 select-none transition-all bg-gradient-to-b from-slate-600 to-slate-700 md:hover:shadow-2xl md:hover:-translate-y-1"
      }
    >
      <div className={"py-2"}>{title}</div>
      <div className={"text-base py-4"}>{desc}</div>
    </section>
  );
};
