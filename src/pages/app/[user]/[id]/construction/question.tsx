import ContentLayout from "root/components/shared/contentLayout";
import { AppHeader } from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";
import IsValidUserProvider from "root/components/isValidUserProvider";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: ctx.query,
    };
};

const TemplatePage: NextPage<{ user: string; id: string }> = ({ user, id }) => {
    const fetchActiveTemplate = useActiveTemplate((state) => state.fetchActiveTemplate);

    const { isLoading } = useSWR(`/api/templates/${user}/${id}`, async () => {
        await fetchActiveTemplate(user, id);
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <IsValidUserProvider>
                <AppHeader />
                <ContentLayout>
                    <div>{id}</div>
                </ContentLayout>
            </IsValidUserProvider>
        </>
    );
};

export default TemplatePage;
