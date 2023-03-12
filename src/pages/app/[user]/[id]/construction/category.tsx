import ContentLayout from "root/components/shared/contentLayout";
import { AppHeader } from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";
import IsValidUserProvider from "root/components/isValidUserProvider";
import { useLoca } from "root/hooks/loca";
import NewCategories, {
  Category,
} from "root/components/constructionPage/newCategory";
import React from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: ctx.query,
  };
};

const CategoryPage: NextPage<{ user: string; id: string }> = ({ user, id }) => {
  const { localization, language } = useLoca();
  const router = useRouter();
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const fetchActiveTemplate = useActiveTemplate(
    (state) => state.fetchActiveTemplate
  );

  const { isLoading } = useSWR(`/api/templates/${user}/${id}`, async () => {
    await fetchActiveTemplate(user, id);

    if (activeTemplate?.type !== "multipleCategories") {
      router.push(`/app/${user}/${id}/construction`);
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <IsValidUserProvider>
        <AppHeader />
        <ContentLayout>
          <div>
            <div
              className={
                "text-center font-bold text-slate-900 my-8 md:text-4xl"
              }
            >
              {localization.constructionPage.createCategory[language]}
            </div>
            <NewCategories />
            <div
              className={
                "p-12 grid gap-8 grid-cols-1 md:grid-cols-5 xl:grid-cols-7"
              }
            >
              {activeTemplate && Object.keys(activeTemplate.template).length > 0
                ? Object.keys(activeTemplate.template).map((e) => (
                    <Category key={e} title={e} />
                  ))
                : null}
            </div>
          </div>
        </ContentLayout>
      </IsValidUserProvider>
    </>
  );
};

export default CategoryPage;
