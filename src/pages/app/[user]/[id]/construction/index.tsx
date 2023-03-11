import ContentLayout from "root/components/shared/contentLayout";
import { AppHeader } from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";
import IsValidUserProvider from "root/components/isValidUserProvider";
import { useLoca } from "root/hooks/loca";
import NewCategorie from "root/components/constructionPage/newCategorie";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: ctx.query,
    };
};

const TemplatePage: NextPage<{ user: string; id: string }> = ({ user, id }) => {
    const fetchActiveTemplate = useActiveTemplate((state) => state.fetchActiveTemplate);
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
                        <div className={"text-center font-bold text-slate-900 my-8 md:text-4xl"}>
                            {localization.constructionPage.createCategory[language]}
                        </div>
                        <div>
                            <NewCategorie />
                        </div>
                    </div>
                </ContentLayout>
            </IsValidUserProvider>
        </>
    );
};

export default TemplatePage;
