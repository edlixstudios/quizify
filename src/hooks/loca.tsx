
import loca from "@/misc/loca.json";
import {useRouter} from "next/router";

type LanguageTypes = "de-DE" | "en-US";

export const useLoca = () => {

    const router = useRouter();

    return  {
        localization: loca,
        language: router.locale as LanguageTypes
    }
}