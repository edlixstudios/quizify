import loca from "public/misc/loca.json";
import { useRouter } from "next/router";
import { useState } from "react";

type LanguageTypes = "de-DE" | "en-US";

export const useLoca = () => {
  const router = useRouter();
  const [localization, _] = useState<typeof loca>(loca);

  return {
    localization: localization,
    language: router.locale as LanguageTypes,
  };
};

export const useLocaReplacer = (locaString: string, replaceValue: string) => {
  return locaString.replaceAll("{0}", replaceValue);
};
