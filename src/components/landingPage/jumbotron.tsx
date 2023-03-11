import { ReactNode } from "react";
import { useLoca } from "root/hooks/loca";
import LandingPageSection from "./section";

export default function Jumbotron() {
    const loca = useLoca();

    return (
        <LandingPageSection variant="light">
            <div
                className={
                    "font-bold text-slate-800 leading-tight text-center text-4xl select-none p-12 md:text-6xl "
                }
            >
                {loca.localization.landingPage.body.jumboTitleP1[loca.language]}{" "}
                <span className={" relative  group"}>
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
                        {loca.localization.landingPage.body.jumboTitleP2[loca.language]}
                    </span>
                </span>{" "}
                {loca.localization.landingPage.body.jumboTitleP3[loca.language]}{" "}
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
                        {loca.localization.landingPage.body.jumboTitleP4[loca.language]}
                    </span>
                </span>
            </div>
            <TextWrapper>
                <div className={"text-center text-xl md:my-8 "}>
                    Vero amet diam takimata amet eos facilisi facer eos feugiat voluptua. Tincidunt
                    et ipsum eirmod sed wisi dolores eirmod amet at diam sadipscing et sed. Enim
                    takimata consequat
                </div>
            </TextWrapper>
        </LandingPageSection>
    );
}

export const TextWrapper = ({ children }: { children: ReactNode }) => {
    return <div className={"leading-normaltext-slate-800 mb-8 px-12 xl:px-64"}>{children}</div>;
};
