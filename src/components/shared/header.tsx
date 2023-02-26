import { useLoca } from "root/hooks/loca";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../util/formComponents";
import { useActiveTemplate } from "root/store/templates";
import { useRouter } from "next/router";
import { FullTemplate } from "root/lib/templateClass";
import { toast } from "react-hot-toast";
import localforage from "localforage";
import Sidebar from "../sidebar";
import ModalPortal from "./modalPortal";

export default function Header() {
    const loca = useLoca();
    const router = useRouter();
    const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
    const setActiveTemplate = useActiveTemplate((state) => state.setActiveTemplate);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    async function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.preventDefault();

        const { user, id } = router.query as { user: string; id: string };

        if (user === "default") {
            toast.promise(localforage.setItem(id, activeTemplate), {
                loading:
                    loca.localization.constructionTemplate.promiseMessage.updateTitle.loading[
                        loca.language
                    ],
                success:
                    loca.localization.constructionTemplate.promiseMessage.updateTitle.success[
                        loca.language
                    ],
                error: loca.localization.constructionTemplate.promiseMessage.updateTitle.error[
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
                        loca.localization.constructionTemplate.promiseMessage.updateTitle.loading[
                            loca.language
                        ],
                    success:
                        loca.localization.constructionTemplate.promiseMessage.updateTitle.success[
                            loca.language
                        ],
                    error: loca.localization.constructionTemplate.promiseMessage.updateTitle.error[
                        loca.language
                    ],
                }
            );
        }
    }

    return (
        <>
            <header className={"p-6 shadow-md flex items-center "}>
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setShowSidebar(true)}
                    title={loca.localization.constructionTemplate.hamburgerButton[loca.language]}
                    className={" transition-colors p-1 rounded-xl xl:hover:bg-sky-200"}
                >
                    <GiHamburgerMenu className={"h-full w-8 text-sky-900"} />
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
                            "text-center font-bold rounded-xl outline outline-sky-500 p-1 xl:p-2 xl:w-1/2 "
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
                <ModalPortal>
                    <Sidebar closeSidebar={() => setShowSidebar(false)} />
                </ModalPortal>
            ) : null}
        </>
    );
}
