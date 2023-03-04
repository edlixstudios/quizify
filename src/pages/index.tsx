import Link from "next/link";
import { useGetSessionId } from "root/hooks/sessionData";
import { LandingPageHeader } from "root/components/shared/header";
import { GetStaticProps } from "next";
import Jumbotron from "root/components/landingPage/jumbotron";
import LandingPageSection from "root/components/landingPage/section";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingSpinner from "root/components/util/loadingSpinner";

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {},
    };
};

export default function Home() {
    const session = useSession();
    const router = useRouter();

    if (session.status === "authenticated") {
        router.push(`/app/${(session.data.user as { id: string }).id}/`);

        return <LoadingSpinner />;
    }

    return (
        <>
            <LandingPageHeader />
            <Jumbotron />
            <LandingPageSection variant={"dark"}>Bam bam bam</LandingPageSection>
        </>
    );
}
