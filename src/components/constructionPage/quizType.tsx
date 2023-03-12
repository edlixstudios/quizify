import {
  ABORT_GRADIENT,
  ABORT_GRADIENT_HOVER,
  DISABLE_GRADIENT,
  MAIN_GRADIENT,
  MAIN_GRADIENT_HOVER_FROM_DARK,
  SECONDARY_GRADIENT,
  SECONDARY_GRADIENT_HOVER,
} from "root/components/shared/gradient";
import { TemplateTypes } from "root/lib/templateClass";
import { useActiveTemplate } from "root/store/templates";
import { useLoca } from "root/hooks/loca";
import { useEffect, useState } from "react";
import ModalPortal, {
  FullScreenModal,
} from "root/components/shared/modalPortal";
import { motion } from "framer-motion";

interface QuizType {
  title: string;
  type: TemplateTypes;
}

export default function QuizType({ title, type }: QuizType) {
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const [showOverrideModal, setShowOverrideModal] = useState<boolean>(false);
  const { localization, language } = useLoca();
  const setActiveTemplate = useActiveTemplate(
    (state) => state.setActiveTemplate
  );

  async function handleOnClick() {
    if (!activeTemplate) return;

    setShowOverrideModal(true);
  }

  return (
    <>
      <button
        onClick={handleOnClick}
        className={`rounded-md p-4 bg-gradient-to-r transition-all ${
          activeTemplate?.type === type
            ? `text-sky-50 ${MAIN_GRADIENT}`
            : `text-slate-200 ${DISABLE_GRADIENT} ${MAIN_GRADIENT_HOVER_FROM_DARK}`
        } md:hover:drop-shadow-lg`}
      >
        <div className={"font-bold text-2xl"}>{title}</div>
      </button>
      {showOverrideModal ? (
        <ModalPortal>
          <FullScreenModal shaded={true}>
            <div className={"flex justify-center"}>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className={
                  "absolute bg-white w-1/3 rounded-md text-center top-1/4 p-4 shadow-md text-2xl "
                }
              >
                <p>{localization.popup.override[language]}</p>
                <div className={"p-8 grid grid-cols-2 gap-4 mt-8"}>
                  <button
                    onClick={() => {
                      setActiveTemplate({
                        ...activeTemplate!,
                        type,
                        template: {},
                      });
                      setShowOverrideModal(false);
                    }}
                    className={`p-2 rounded-md bg-gradient-to-r text-emerald-50 ${SECONDARY_GRADIENT} ${SECONDARY_GRADIENT_HOVER}`}
                  >
                    {localization.popup.yes[language]}
                  </button>
                  <button
                    onClick={() => {
                      setShowOverrideModal(false);
                    }}
                    className={`p-2 rounded-md bg-gradient-to-r text-emerald-50 text-rose-50 ${ABORT_GRADIENT} ${ABORT_GRADIENT_HOVER}`}
                  >
                    {localization.popup.no[language]}
                  </button>
                </div>
              </motion.div>
            </div>
          </FullScreenModal>
        </ModalPortal>
      ) : null}
    </>
  );
}

export const ExplanationText = () => {
  const [explanationText, setExplanationText] = useState<string>("");
  const { localization, language } = useLoca();
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);

  useEffect(() => {
    switch (activeTemplate?.type) {
      case "singleCategory":
        setExplanationText(
          localization.constructionPage.explanationText.single[language]
        );
        break;
      case "multipleCategories":
        setExplanationText(
          localization.constructionPage.explanationText.multiple[language]
        );
        break;
      case "scored":
        setExplanationText(
          localization.constructionPage.explanationText.scored[language]
        );
        break;
    }
  }, [activeTemplate?.type]);

  return <div className={"p-12 text-center text-2xl"}>{explanationText}</div>;
};
