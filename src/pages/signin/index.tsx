import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LandingPageHeader } from "root/components/shared/header";
import { AuthForm } from "root/components/signin/authForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Session } from "next-auth";
import LoadingSpinner from "root/components/util/loadingSpinner";

const SignInPage: NextPage = () => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "authenticated") {
        if ((session.data.user as { hasSubscription: boolean }).hasSubscription) {
            router.push(`/app/${(session.data.user as { id: string }).id}`);
        } else {
            router.push(`/user/${(session.data.user as { id: string }).id}`);
        }

        return <LoadingSpinner />;
    }

    return (
        <>
            <LandingPageHeader />
            <AuthForm />
        </>
    );
};

export default SignInPage;
