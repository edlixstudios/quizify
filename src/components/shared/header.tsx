import { useLoca } from "@/hooks/loca";
import { useTemplateFetch } from "@/hooks/template";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Input } from "../util/formComponents";

export default function Header() {
    const { id } = useRouter().query as { id: string };
    const loca = useLoca();
    const template = useTemplateFetch(id);

    const [templateName, setTemplateName] = useState<string>(template?.title!);

    return (
        <header className={"p-6 shadow-md flex items-center "}>
            <button
                title={loca.localization.constructionTemplate.hamburgerButton[loca.language]}
                className={" transition-colors p-1 rounded-xl xl:hover:bg-sky-200"}
            >
                <GiHamburgerMenu className={"h-full w-8 text-sky-900"} />
            </button>
            <div className={"flex-grow flex justify-center"}>
                <Input
                    type={"text"}
                    className={
                        "text-center font-bold rounded-xl outline outline-sky-500 p-1 xl:p-2 xl:w-1/2 "
                    }
                    value={templateName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTemplateName(e.target.value)
                    }
                />
            </div>
        </header>
    );
}
