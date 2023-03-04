import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { useLoca } from "root/hooks/loca";
import LandingPageSection from "../landingPage/section";
import { MAIN_GRADIENT, SECONDARY_GRADIENT } from "../shared/gradient";
import { Button, Input } from "../util/formComponents";
import { AiFillGithub } from "react-icons/ai";

export const AuthForm = () => {
    const [authData, setAuthData] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const { localization, language } = useLoca();
    const router = useRouter();

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const signInResponse = await signIn("credentials", { authData });

        console.log("Sign in", signInResponse);
    }

    function startQuizfyLocal() {
        router.push("/app/default");
    }

    return (
        <LandingPageSection variant={"light"}>
            <div className={"flex flex-col items-center"}>
                <div className={"p-8 font-bold md:text-3xl"}>
                    {localization.signInPage.title[language]}
                </div>
                <Button
                    onClick={startQuizfyLocal}
                    className={` bg-gradient-to-b text-emerald-50 shadow-md w-1/3 shadow-emerald-500/50 ${SECONDARY_GRADIENT}`}
                >
                    {localization.signInPage.free[language]}
                </Button>
                <Divider title={localization.signInPage.dividerOr[language]} />
                <form className={"w-1/3 flex flex-col gap-4"} onSubmit={handleOnSubmit}>
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
                        className={` bg-gradient-to-b text-sky-50 shadow-md shadow-sky-500/50 ${MAIN_GRADIENT}`}
                    >
                        {localization.signInPage.signInButton[language]}
                    </Button>
                </form>
                <Divider title={localization.signInPage.dividerProvider[language]} />
                <ProviderButton
                    provider={"github"}
                    providerIcon={<AiFillGithub className={"w-6 h-6"} />}
                />
            </div>
        </LandingPageSection>
    );
};

function Divider({ title }: { title: string }) {
    return (
        <div className={`w-2/4 relative`}>
            <div className={`my-8 bg-slate-400 h-0.5 w-full`} />
            <div
                className={
                    "absolute bg-white p-1 font-inter bottom-4 origin-center left-1/2 -translate-x-1/2 select-none"
                }
            >
                {title}
            </div>
        </div>
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
            className={` bg-gradient-to-b w-1/3 text-sky-50 shadow-md flex items-center gap-8 shadow-sky-500/50 ${MAIN_GRADIENT}`}
        >
            <div className={"capitalize flex-grow"}>{provider}</div>
            {providerIcon}
        </Button>
    );
}
