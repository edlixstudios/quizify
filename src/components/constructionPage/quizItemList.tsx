import { MdOutlineReorder } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useActiveTemplate } from "root/store/templates";
import { ReactNode, useEffect, useState } from "react";
import { Question, SingleCategoryQuiz } from "root/lib/templateClass";
import ModalPortal, {
  FullScreenModal,
} from "root/components/shared/modalPortal";
import { motion } from "framer-motion";
import { Button, Input } from "root/components/util/formComponents";
import { MAIN_GRADIENT } from "root/components/shared/gradient";
import { useLoca } from "root/hooks/loca";

export const QuizItemIteratorContainer = () => {
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);

  useEffect(() => {
    console.log("Active", activeTemplate);
  }, []);

  switch (activeTemplate?.type) {
    case "singleCategory":
      return (
        <QuizItemIteratorLayout>
          {(activeTemplate.template as SingleCategoryQuiz).questions.map(
            (e, i) => (
              <QuizItemList key={i} question={e.question} index={i} />
            )
          )}
        </QuizItemIteratorLayout>
      );
    case "multipleCategories":
      return <></>;
    case "scored":
      return <></>;
    default:
      return <></>;
  }
};

const QuizItemIteratorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"p-8  mx-auto grid grid-cols-1 gap-1 md:w-2/3"}>
      <div className={"p-8  mx-auto grid grid-cols-1 gap-1 md:w-2/3"}>
        {children}
      </div>
    </div>
  );
};

const QuizItemList = ({
  question,
  index,
}: Partial<Question> & { index: number }) => {
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const setActiveTemplate = useActiveTemplate(
    (state) => state.setActiveTemplate
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  function deleteEntrie() {
    if (!activeTemplate) return;

    (activeTemplate.template as SingleCategoryQuiz).questions.splice(index, 1);

    setActiveTemplate({ ...activeTemplate });
  }

  function editEntrie() {
    setShowModal(true);
  }

  return (
    <>
      <div
        className={`rounded-md p-2 font-bold border-2 flex items-center gap-2 transition-all text-slate-900 border-slate-900 md:hover:bg-slate-100`}
      >
        <span>
          <MdOutlineReorder className={"h-8 w-8"} />
        </span>
        <span className={"text-center w-full md:text-xl"}>{question}</span>
        <span className={"flex gap-2"}>
          <button
            onClick={editEntrie}
            className={"md:hover:bg-sky-300 rounded-md p-1"}
          >
            <AiFillEdit className={"w-6 h-6 text-sky-500 md:w-8 md:h-8"} />
          </button>
          <button
            onClick={deleteEntrie}
            className={"md:hover:bg-rose-300 rounded-md p-1"}
          >
            <AiFillDelete className={" w-6 h-6 text-rose-500 md:w-8 md:h-8"} />
          </button>
        </span>
      </div>
      {showModal ? (
        <QuestionForm
          initQuestion={
            (activeTemplate?.template as SingleCategoryQuiz).questions[index]
          }
          closeModal={() => {
            setShowModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export const QuestionForm = ({
  closeModal,
  initQuestion = null,
}: {
  closeModal: () => void;
  initQuestion?: Question | null;
}) => {
  const [quizForm, setQuizForm] = useState<Question>(
    initQuestion ?? {
      question: "",
      correctAnswer: "",
      possibleAnswers: [],
    }
  );

  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const setActiveTemplate = useActiveTemplate(
    (state) => state.setActiveTemplate
  );
  const { localization, language } = useLoca();

  return (
    <ModalPortal>
      <FullScreenModal shaded={true}>
        <div className={"flex justify-center overflow-auto "}>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className={
              "absolute bg-white p-4 rounded-md w-2/3 shadow-xl static top-8  "
            }
          >
            <form
              className={"w-2/3 mx-auto flex flex-col gap-4"}
              onSubmit={(e) => {
                e.preventDefault();
                switch (activeTemplate?.type) {
                  case "singleCategory":
                    if (!initQuestion) {
                      (
                        activeTemplate.template as SingleCategoryQuiz
                      ).questions.push(quizForm);
                    }

                    setActiveTemplate({ ...activeTemplate });

                    break;

                  case "multipleCategories":
                    break;

                  case "scored":
                    break;
                }
                closeModal();
                setQuizForm({
                  question: "",
                  possibleAnswers: [],
                  correctAnswer: "",
                  media: "",
                });
              }}
            >
              <Input
                value={quizForm.question}
                onChange={(e) => {
                  setQuizForm((prev) => ({
                    ...prev,
                    question: e.target.value,
                  }));
                }}
                label={
                  localization.constructionPage.questions.questionForm.question[
                    language
                  ]
                }
              />
              <label
                className={
                  "indent-2 capitalize font-inter text-slate-600 text-sm md:text-xl"
                }
              >
                {
                  localization.constructionPage.questions.questionForm
                    .possibleAnswers[language]
                }
              </label>
              {quizForm.possibleAnswers.map((e, i) => (
                <div key={i} className={"flex items-end gap-2"}>
                  <Input
                    required={true}
                    placeholder={`${
                      localization.constructionPage.questions.questionForm
                        .answer[language]
                    } ${i + 1}`}
                    type={"text"}
                    key={i}
                    label={`${
                      localization.constructionPage.questions.questionForm
                        .answer[language]
                    } ${i + 1}`}
                    value={quizForm.possibleAnswers[i]}
                    onChange={(e) => {
                      quizForm.possibleAnswers[i] = e.target.value;
                      setQuizForm({ ...quizForm });
                    }}
                  />
                  <button
                    onClick={() => {
                      quizForm.possibleAnswers.splice(i, 1);

                      setQuizForm({ ...quizForm });
                    }}
                    className={"rounded-md bg-rose-200 md:hover:bg-rose-300"}
                  >
                    <AiFillDelete className={"h-12 w-12 p-1 text-rose-500"} />
                  </button>
                </div>
              ))}
              <Button
                type={"button"}
                onClick={() => {
                  if (quizForm.possibleAnswers.length >= 4) return;
                  quizForm.possibleAnswers.push("");
                  setQuizForm({ ...quizForm });
                }}
                className={`bg-gradient-to-r text-sky-50 ${MAIN_GRADIENT}`}
              >
                Neu Antwort hinzufügen
              </Button>
              <label
                className={
                  "indent-2 capitalize font-inter text-slate-600 text-sm md:text-xl"
                }
              >
                {
                  localization.constructionPage.questions.questionForm
                    .correctAnswer[language]
                }
              </label>
              <select
                onChange={(e) => {
                  quizForm.correctAnswer = e.target.value;
                  setQuizForm({ ...quizForm });
                }}
                className={"p-2 border-2 border-slate-900 rounded-md"}
              >
                {quizForm.possibleAnswers.map((e) => (
                  <option>{e}</option>
                ))}
              </select>
              <Button
                type={"submit"}
                className={`bg-gradient-to-r text-sky-50 ${MAIN_GRADIENT}`}
              >
                Frage erstellen
              </Button>
            </form>
          </motion.div>
        </div>
      </FullScreenModal>
    </ModalPortal>
  );
};
