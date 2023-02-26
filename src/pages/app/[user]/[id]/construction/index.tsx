import ContentLayout from "root/components/shared/contentLayout";
import Header from "root/components/shared/header";
import { GetServerSideProps, NextPage } from "next/types";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { useActiveTemplate } from "root/store/templates";

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
            <Header />
            <ContentLayout>
                <div>{id}</div>
            </ContentLayout>
        </>
    );
};

export default TemplatePage;
