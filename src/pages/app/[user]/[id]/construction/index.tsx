import ContentLayout from "@/components/shared/contentLayout";
import Header from "@/components/shared/header";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

const TemplatePage: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Header />
            <ContentLayout>
                <div>{router.query.id}</div>
            </ContentLayout>
        </>
    );
};

export default TemplatePage;
