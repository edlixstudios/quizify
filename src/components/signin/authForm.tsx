import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { useLoca } from "root/hooks/loca";
import LandingPageSection from "../landingPage/section";
import {
    MAIN_GRADIENT,
    MAIN_GRADIENT_HOVER,
    SECONDARY_GRADIENT,
    SECONDARY_GRADIENT_HOVER,
} from "../shared/gradient";
import { Button, Input } from "../util/formComponents";
import { AiFillGithub } from "react-icons/ai";
import { FullScreenModalWithLoadingSpinner } from "../shared/modalPortal";

export interface AuthData {
    email: string;
    password: string;
}

export const AuthForm = () => {
    const { localization, language } = useLoca();

    return (
        <LandingPageSection variant={"light"}>
            <div className={"flex flex-col items-center"}>
                <div className={"p-8 font-bold  md:text-3xl"}>
                    {localization.signInPage.title[language]}
                </div>
                <StartAppLocal />
                <Divider title={localization.signInPage.dividerOr[language]} />
                <CredentialsGroup />
                <Divider title={localization.signInPage.dividerOr[language]} />
                <ProviderGroup />
            </div>
        </LandingPageSection>
    );
};

function Divider({ title }: { title: string }) {
    return (
        <div className={`w-3/4 relative md:w-1/4`}>
            <div className={`my-8 bg-slate-400 h-0.5 w-full`} />
            <div
                className={
                    "absolute bg-white p-1 w-fit text-xs font-inter bottom-5 origin-center left-1/2 -translate-x-1/2 select-none text-center md:text-xl md:bottom-4"
                }
            >
                {title}
            </div>
        </div>
    );
}

export function StartAppLocal() {
    const router = useRouter();
    const { localization, language } = useLoca();

    const [isAppLoading, setIsAppLoading] = useState<boolean>(false);
    function startQuizfyLocal() {
        setIsAppLoading(true);
        router.push("/app/default");
    }

    if (isAppLoading) {
        return <FullScreenModalWithLoadingSpinner />;
    }

    return (
        <Button
            onClick={startQuizfyLocal}
            className={` bg-gradient-to-b text-emerald-50 shadow-md w-2/3 text-base shadow-emerald-500/50 ${SECONDARY_GRADIENT} md:text-xl md:w-1/3  ${SECONDARY_GRADIENT_HOVER}`}
        >
            {localization.signInPage.free[language]}
        </Button>
    );
}

export function CredentialsGroup() {
    const [authData, setAuthData] = useState<AuthData>({
        email: "",
        password: "",
    });
    const { localization, language } = useLoca();

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await signIn("credentials", {
            email: authData.email,
            password: authData.password,
            redirect: false,
        });
    }

    return (
        <form className={"flex flex-col gap-4 w-2/3 md:w-1/3"} onSubmit={handleOnSubmit}>
            <Input
                required
                placeholder={"max@mustermann.com"}
                value={authData.email}
                label={localization.signInPage.email[language]}
                type={"email"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAuthData((prev) => ({ ...prev, email: e.target.value }));
                }}
            />
            <Input
                required
                placeholder={"***SuperSecretPassword***"}
                value={authData.password}
                label={localization.signInPage.password[language]}
                type={"password"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAuthData((prev) => ({ ...prev, password: e.target.value }));
                }}
            />
            <Button
                type={"submit"}
                className={` bg-gradient-to-b text-sky-50  shadow-md shadow-sky-500/50 text-base ${MAIN_GRADIENT} md:text-xl ${MAIN_GRADIENT_HOVER}`}
            >
                {localization.signInPage.signInButton[language]}
            </Button>
        </form>
    );
}

export function ProviderGroup() {
    return (
        <>
            <ProviderButton
                provider={"github"}
                providerIcon={<AiFillGithub className={"w-6 h-6"} />}
            />
        </>
    );
}

interface ProviderButton {
    provider: "github";
    providerIcon: ReactNode;
}

export function ProviderButton({ provider, providerIcon }: ProviderButton) {
    async function handleSignIn() {
        await signIn(provider);
    }

    return (
        <Button
            onClick={handleSignIn}
            type={"submit"}
            className={` bg-gradient-to-b w-2/3 text-sky-50 shadow-md flex items-center gap-8 shadow-sky-500/50 text-base ${MAIN_GRADIENT} md:text-xl md:w-1/3 ${MAIN_GRADIENT_HOVER}`}
        >
            <div className={"capitalize flex-grow"}>{provider}</div>
            {providerIcon}
        </Button>
    );
}
