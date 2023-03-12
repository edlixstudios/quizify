import ContentLayout from "root/components/shared/contentLayout";
import { AppHeader } from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";
import IsValidUserProvider from "root/components/isValidUserProvider";
import { useLoca } from "root/hooks/loca";
import { Button } from "root/components/util/formComponents";
import {
  MAIN_GRADIENT,
  MAIN_GRADIENT_HOVER,
} from "root/components/shared/gradient";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  QuestionForm,
  QuizItemIteratorContainer,
} from "root/components/constructionPage/quizItemList";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: ctx.query,
  };
};

const QuestionPage: NextPage<{ user: string; id: string }> = ({ user, id }) => {
  const fetchActiveTemplate = useActiveTemplate(
    (state) => state.fetchActiveTemplate
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const { localization, language } = useLoca();

  const { isLoading } = useSWR(`/api/templates/${user}/${id}`, async () => {
    await fetchActiveTemplate(user, id);
  });

  function handleOnClick() {
    setShowModal(true);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <IsValidUserProvider>
        <AppHeader />
        <ContentLayout>
          <div className={"text-4xl font-bold text-center text-slate-900 mb-8"}>
            {localization.constructionPage.questions.title[language]}
          </div>
          <Button
            onClick={handleOnClick}
            className={`bg-gradient-to-r text-sky-100 flex gap-2 mx-auto items-center ${MAIN_GRADIENT} ${MAIN_GRADIENT_HOVER}`}
          >
            <span>
              {localization.constructionPage.questions.createNew[language]}
            </span>
            <span>
              <FaPlus />
            </span>
          </Button>
          <QuizItemIteratorContainer />
        </ContentLayout>
      </IsValidUserProvider>
      {showModal ? (
        <QuestionForm
          closeModal={() => {
            setShowModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default QuestionPage;
