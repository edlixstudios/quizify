import { useLoca } from "root/hooks/loca";
import { MAIN_GRADIENT_DARK, MAIN_GRADIENT_LIGHT } from "../shared/gradient";
import { Button } from "../util/formComponents";
import LandingPageSection from "./section";
import { AiFillCheckCircle } from "react-icons/ai";
import { useState } from "react";
import { FullScreenModalWithLoadingSpinner } from "../shared/modalPortal";
import { useRouter } from "next/router";

export default function Price() {
    const { localization, language } = useLoca();
    const [staringApp, setStartingApp] = useState<boolean>(false);
    const router = useRouter();

    if (staringApp) {
        return <FullScreenModalWithLoadingSpinner />;
    }

    return (
        <LandingPageSection variant={"light"}>
            <div className={"p-4 xl:p-12"} id={"prices"}>
                <div className={"text-center leading-normal"}>
                    <div className={"font-bold"}>
                        {localization.landingPage.body.price.priceTitle[language]}
                    </div>
                    <div className={"text-base text-slate-600 md:text-xl"}>
                        {localization.landingPage.body.price.priceSubTitle[language]}
                    </div>
                </div>
                <div className={" my-8 p-4 grid grid-cols-1 gap-4 md:grid-cols-3"}>
                    <PriceSection
                        colorVarian={"default"}
                        price={localization.landingPage.body.price.free.title[language]}
                        priceClass={localization.landingPage.body.price.free.subTitle[language]}
                        priceClassDesc={localization.landingPage.body.price.free.desc[language]}
                        buttonText={localization.landingPage.body.price.free.button[language]}
                        featureList={localization.landingPage.body.price.free.features[language]}
                        onClick={() => {
                            router.push("/app/default");
                            setStartingApp(true);
                        }}
                    />
                    <PriceSection
                        colorVarian={"highlight"}
                        price={localization.landingPage.body.price.medium.title[language]}
                        priceClass={localization.landingPage.body.price.medium.subTitle[language]}
                        priceClassDesc={localization.landingPage.body.price.medium.desc[language]}
                        buttonText={localization.landingPage.body.price.medium.button[language]}
                        featureList={localization.landingPage.body.price.medium.features[language]}
                        onClick={() => {
                            router.push("/signin");
                        }}
                    />
                    <PriceSection
                        colorVarian={"default"}
                        price={localization.landingPage.body.price.large.title[language]}
                        priceClass={localization.landingPage.body.price.large.subTitle[language]}
                        priceClassDesc={localization.landingPage.body.price.large.desc[language]}
                        buttonText={localization.landingPage.body.price.large.button[language]}
                        featureList={localization.landingPage.body.price.large.features[language]}
                        onClick={() => {
                            router.push("/signin");
                        }}
                    />
                </div>
            </div>
        </LandingPageSection>
    );
}

interface PriceSection {
    price: string;
    colorVarian: "default" | "highlight";
    priceClass: string;
    priceClassDesc: string;
    buttonText: string;
    featureList: string[];
    onClick: () => void;
}

const PriceSection = ({
    price,
    colorVarian,
    priceClass,
    priceClassDesc,
    buttonText,
    featureList = [],
    onClick,
}: PriceSection) => {
    const isDefault = colorVarian === "default";

    return (
        <section
            className={`rounded-md p-4 bg-gradient-to-b text-xl transition-all ${
                isDefault
                    ? `text-sky-900 ${MAIN_GRADIENT_LIGHT} md:hover:shadow-sky-200/50`
                    : `text-sky-50 ${MAIN_GRADIENT_DARK} md:hover:shadow-sky-800/50`
            } md:hover:shadow-xl md:hover:-translate-y-1`}
        >
            <div className={"font-bold text-3xl"}>{price}</div>
            <div className={"mt-4 "}>{priceClass}</div>
            <div className={`mt-1 text-base ${isDefault ? "text-sky-700" : "text-sky-200"}`}>
                {priceClassDesc}
            </div>
            <Button
                onClick={onClick}
                className={`rounded-md my-8 w-full ${
                    isDefault
                        ? "bg-sky-600 text-sky-50 md:hover:bg-sky-800"
                        : "bg-sky-200 text-sky-900 md:hover:bg-sky-300"
                } md:hover:shadow-md`}
            >
                {buttonText}
            </Button>
            <ul>
                {featureList.map((e, i) => (
                    <FeatureItem key={i} featureName={e} />
                ))}
            </ul>
        </section>
    );
};

const FeatureItem = ({ featureName }: { featureName: string }) => {
    return (
        <li className={"flex items-center gap-6 my-1 text-base"}>
            <AiFillCheckCircle className={"min-w-[1.5rem] min-h-[1.5rem]"} />
            <p>{featureName}</p>
        </li>
    );
};
