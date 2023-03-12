import ContentLayout from "root/components/shared/contentLayout";
import { AppHeader } from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";
import IsValidUserProvider from "root/components/isValidUserProvider";
import { useLoca } from "root/hooks/loca";
import QuizType, {
  ExplanationText,
} from "root/components/constructionPage/quizType";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: ctx.query,
  };
};

const QuizTypePage: NextPage<{ user: string; id: string }> = ({ user, id }) => {
  const fetchActiveTemplate = useActiveTemplate(
    (state) => state.fetchActiveTemplate
  );
  const { localization, language } = useLoca();

  const { isLoading } = useSWR(`/api/templates/${user}/${id}`, async () => {
    await fetchActiveTemplate(user, id);
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <IsValidUserProvider>
        <AppHeader />
        <ContentLayout>
          <div>
            <div
              className={"text-center font-bold text-slate-900 my-8 text-4xl "}
            >
              {localization.constructionPage.pickQuizType[language]}
            </div>
            <div
              className={
                "grid grid-cols-1 gap-8 justify-around p-8 md:grid-cols-3"
              }
            >
              <QuizType
                type={"singleCategory"}
                title={localization.constructionPage.singleType[language]}
              />
              <QuizType
                type={"multipleCategories"}
                title={localization.constructionPage.multiple[language]}
              />
              <QuizType
                type={"scored"}
                title={localization.constructionPage.scored[language]}
              />
            </div>
            <ExplanationText />
          </div>
        </ContentLayout>
      </IsValidUserProvider>
    </>
  );
};

export default QuizTypePage;
