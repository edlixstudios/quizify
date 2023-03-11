import { useLoca } from "root/hooks/loca";
import React, { ReactNode, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../util/formComponents";
import { useActiveTemplate } from "root/store/templates";
import { useRouter } from "next/router";
import { FullTemplate } from "root/lib/templateClass";
import { toast } from "react-hot-toast";
import localforage from "localforage";
import AppSidebar from "../sidebar";
import ModalPortal, { FullScreenModal } from "./modalPortal";
import Link from "next/link";
import {
    MAIN_GRADIENT,
    MAIN_GRADIENT_HOVER,
    SECONDARY_GRADIENT,
    SECONDARY_GRADIENT_HOVER,
} from "./gradient";

export function AppHeader() {
    const loca = useLoca();
    const router = useRouter();
    const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
    const setActiveTemplate = useActiveTemplate((state) => state.setActiveTemplate);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    async function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.preventDefault();

        const { user, id } = router.query as { user: string; id: string };

        if (user === "local") {
            toast.promise(localforage.setItem(id, activeTemplate), {
                loading:
                    loca.localization.constructionPage.promiseMessage.updateTitle.loading[
                        loca.language
                    ],
                success:
                    loca.localization.constructionPage.promiseMessage.updateTitle.success[
                        loca.language
                    ],
                error: loca.localization.constructionPage.promiseMessage.updateTitle.error[
                    loca.language
                ],
            });
        } else {
            toast.promise(
                (
                    await fetch(`${location.origin}/api/templates/${user}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(activeTemplate),
                    })
                ).json(),
                {
                    loading:
                        loca.localization.constructionPage.promiseMessage.updateTitle.loading[
                            loca.language
                        ],
                    success:
                        loca.localization.constructionPage.promiseMessage.updateTitle.success[
                            loca.language
                        ],
                    error: loca.localization.constructionPage.promiseMessage.updateTitle.error[
                        loca.language
                    ],
                }
            );
        }
    }

    return (
        <>
            <header className={"p-6 shadow-md flex items-center"}>
                <button
                    onClick={(e) => setShowSidebar(true)}
                    title={loca.localization.constructionPage.hamburgerButton[loca.language]}
                    className={" transition-colors p-1 rounded-md xl:hover:bg-slate-200"}
                >
                    <GiHamburgerMenu className={"h-full w-8 text-slate-900"} />
                </button>
                <div className={"flex-grow flex justify-center"}>
                    <Input
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") {
                                e.currentTarget.blur();
                            }
                        }}
                        onBlur={handleOnBlur}
                        type={"text"}
                        className={
                            "text-center font-bold rounded-md outline outline-sky-500 p-1 xl:p-2 xl:w-1/2 "
                        }
                        value={activeTemplate?.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setActiveTemplate({
                                ...(activeTemplate as FullTemplate),
                                title: e.target.value,
                            })
                        }
                    />
                </div>
            </header>
            {showSidebar ? (
                <FullScreenModal shaded={true}>
                    <AppSidebar closeSidebar={() => setShowSidebar(false)} />
                </FullScreenModal>
            ) : null}
        </>
    );
}

export function LandingPageHeader() {
    const loca = useLoca();

    return (
        <header className={"flex justify-center font-roboto xl:p-8"}>
            <nav className={"flex items-center xl:w-4/5"}>
                <Link
                    href={"/"}
                    className={`font-bold text-2xl bg-gradient-to-b font-inter  p-2 w-fit transition-all ${MAIN_GRADIENT} text-transparent bg-clip-text hover:xl:scale-110`}
                >
                    {loca.localization.app}
                </Link>
                <div
                    className={
                        "flex-grow mx-auto gap-4 justify-between items-center hidden xl:flex"
                    }
                >
                    <div className={"flex px-8 gap-4"}>
                        <NavLink href={"/#features"}>
                            {loca.localization.landingPage.header.feature[loca.language]}
                        </NavLink>
                        <NavLink href={"/#prices"}>
                            {loca.localization.landingPage.header.prices[loca.language]}
                        </NavLink>
                    </div>
                    <div>
                        {/* <NavLink href={"/signin"} variant={"gradient"}>
                            {loca.localization.landingPage.header.signIn[loca.language]}
                        </NavLink> */}
                        <NavLink href={"/app/local"} variant={"gradient"} colorSet={"secondary"}>
                            {loca.localization.landingPage.header.signInLocal[loca.language]}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export function NavLink({
    children,
    href,
    variant = "default",
    colorSet = undefined,
}: {
    children: ReactNode;
    href: string;
    variant?: "default" | "gradient";
    colorSet?: "primary" | "secondary" | undefined;
}) {
    if (variant === "gradient") {
        if (colorSet) {
            if (colorSet !== "primary") {
                return (
                    <Link
                        className={` rounded-md bg-gradient-to-b ${SECONDARY_GRADIENT} p-3 font-bold text-blue-50 shadow-md shadow-sky-500/50 ${SECONDARY_GRADIENT_HOVER}`}
                        href={href}
                    >
                        {children}
                    </Link>
                );
            } else {
                return (
                    <Link
                        className={` rounded-md bg-gradient-to-b ${MAIN_GRADIENT} p-3 font-bold text-blue-50 shadow-md shadow-sky-500/50 ${MAIN_GRADIENT_HOVER}`}
                        href={href}
                    >
                        {children}
                    </Link>
                );
            }
        }
    }

    return (
        <Link className={"rounded-md p-1 text-slate-900 hover:xl:bg-slate-200 "} href={href}>
            {children}
        </Link>
    );
}
