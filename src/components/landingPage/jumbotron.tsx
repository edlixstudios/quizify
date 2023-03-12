import { ReactNode } from "react";
import { useLocaReplacer, useLoca } from "root/hooks/loca";
import LandingPageSection from "./section";

export default function Jumbotron() {
  const { localization, language } = useLoca();
  // const replacer = useLocaReplacer(localization.landingPage.body.desc[language]);

  return (
    <LandingPageSection variant="light">
      <div
        className={
          "font-bold text-slate-800 text-center text-4xl select-none p-12 md:text-6xl "
        }
      >
        {localization.landingPage.body.jumboTitleP1[language]}{" "}
        <span className={" relative group leading-loose"}>
          <div
            className={
              "absolute left-0 top-0 w-full h-full blur-none md:group-hover:bg-gradient-to-r md:group-hover:from-sky-400/25 md:group-hover:to-blue-500/25  md:group-hover:blur-2xl "
            }
          />
          <span
            className={
              "relative bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text"
            }
          >
            {localization.landingPage.body.jumboTitleP2[language]}
          </span>
        </span>{" "}
        {localization.landingPage.body.jumboTitleP3[language]}{" "}
        <span className={"relative group"}>
          <div
            className={
              "absolute left-0 top-0 w-full h-full blur-none md:group-hover:bg-gradient-to-r md:group-hover:from-emerald-400/25 md:group-hover:to-green-500/25 md:group-hover:blur-2xl "
            }
          />
          <span
            className={
              "relative bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text"
            }
          >
            {localization.landingPage.body.jumboTitleP4[language]}
          </span>
        </span>
      </div>
      <TextWrapper>
        <div className={"text-center text-xl md:my-8 "}>
          {useLocaReplacer(
            localization.landingPage.body.desc[language],
            localization.app
          )}
        </div>
      </TextWrapper>
    </LandingPageSection>
  );
}

export const TextWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"leading-normal text-slate-800 mb-8 px-12 xl:px-16"}>
      {children}
    </div>
  );
};
