import { motion } from "framer-motion";
import { useLoca } from "root/hooks/loca";
import { AiFillFileAdd } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import React, { useState } from "react";
import ModalPortal, { FullScreenModal } from "./shared/modalPortal";
import { useModal } from "root/store/modal";
import { Button, Input } from "./util/formComponents";
import { useTemplates } from "root/store/templates";
import Link from "next/link";
import { MdConstruction } from "react-icons/md";
import { useTemplateFetch } from "root/hooks/template";
import { useRouter } from "next/router";
import LoadingSpinner from "./util/loadingSpinner";

export const CreateNewTemplate = () => {
    const loca = useLoca();

    const showModal = useModal((state) => state.showModal);
    const setShowModal = useModal((state) => state.setShowModal);

    function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
        setShowModal(true);
    }

    return (
        <>
            <button
                onClick={handleOnClick}
                className={
                    " bg-slate-100 h-[15rem] w-[11rem] rounded-md shadow-sm transition-all group xl:hover:scale-105 xl:hover:bg-slate-200 xl:hover:shadow-xl"
                }
            >
                <div className={"h-full p-4 flex flex-col items-center"}>
                    <p>{loca.localization.templateDashboard.newTemplate[loca.language]}</p>
                    <AiFillFileAdd
                        className={
                            "text-slate-300 w-full flex-grow p-4 transition-colors group-hover:xl:text-slate-400"
                        }
                    />
                </div>
            </button>
            {showModal && (
                <ModalPortal>
                    <TemplateModal />
                </ModalPortal>
            )}
        </>
    );
};

function TemplateModal() {
    const setShowModal = useModal((state) => state.setShowModal);
    const router = useRouter();
    const loca = useLoca();
    const [templateName, setTemplateName] = useState<string>("");
    const getAllTemplates = useTemplates((state) => state.getAllTemplates);
    const createTemplate = useTemplates((state) => state.createTemplate);

    function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).id === "modalScreen") {
            setShowModal(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const userId = router.query.user as string;

        await createTemplate(templateName, userId);
        await getAllTemplates(userId);
        setTemplateName("");
        setShowModal(false);
        
    }

    return (
        <FullScreenModal shaded={true}>
            <div
                onClick={handleOnClick}
                id={"modalScreen"}
                className="w-full h-full p-8 flex justify-center items-center"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-50 rounded-md shadow-xl p-4 w-full h-[15rem] xl:w-1/2"
                >
                    <div className={"h-full flex flex-col "}>
                        <div className={"flex items-center "}>
                            <p className={"flex-grow text-center font-bold xl:text-2xl"}>
                                {
                                    loca.localization.templateDashboard.createNewTemplateTitle[
                                        loca.language
                                    ]
                                }
                            </p>
                            <button
                                className={
                                    "p-2 rounded-md transition-color group xl:hover:bg-rose-300 "
                                }
                                title={
                                    loca.localization.templateDashboard.closeModalHint[
                                        loca.language
                                    ]
                                }
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                <ImCross
                                    className={
                                        "text-rose-500 transition-transform xl:group-hover:scale-110"
                                    }
                                />
                            </button>
                        </div>
                        <div className={"flex-grow flex flex-col items-center justify-center"}>
                            <form className={"grid grid-rows-2 gap-4"} onSubmit={handleSubmit}>
                                <Input
                                    required
                                    autoFocus
                                    type={"text"}
                                    value={templateName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setTemplateName(e.target.value);
                                    }}
                                />
                                <Button type={"submit"} className={"bg-sky-500 text-sky-50"}>
                                    {
                                        loca.localization.templateDashboard.createNewTemplateButton[
                                            loca.language
                                        ]
                                    }
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </FullScreenModal>
    );
}

export interface TemplatePicker {
    title: string;
    id: string;
    user: string;
}

export const TemplatePicker = ({ title, id, user }: TemplatePicker) => {
    const [randomNumber, _] = useState<number>(
        Math.floor(Math.random() * Object.keys(colorPicker).length)
    );
    const [showLoading, setShowLoading] = useState<boolean>(false);

    const loca = useLoca();
    const template = useTemplateFetch(user, id);

    function onClickHandler() {
        setShowLoading(true);
    }

    return (
        <>
            <Link
                onClick={onClickHandler}
                href={template?.finish ? `/app/${user}/${id}/` : `/app/${user}/${id}/construction/`}
                className={`h-[15rem] w-[11rem] rounded-md overflow-clip shadow-sm transition-all ${colorPicker[randomNumber]} group xl:hover:scale-105 xl:hover:shadow-xl`}
            >
                {!template?.finish && (
                    <div
                        className={
                            "relative rotate-[25deg] shadow-md flex items-center justify-center gap-2 text-sky-50 translate-x-10 translate-y-4  text-center bg-sky-500"
                        }
                    >
                        {loca.localization.templateDashboard.templateUnfinished[loca.language]}
                        <MdConstruction />
                    </div>
                )}
                <p
                    className={
                        "h-full text-2xl font-bold p-4 flex flex-col justify-center items-center"
                    }
                >
                    {title}
                </p>
            </Link>
            {showLoading && (
                <ModalPortal>
                    <FullScreenModal shaded>
                        <LoadingSpinner />
                    </FullScreenModal>
                </ModalPortal>
            )}
        </>
    );
};

const colorPicker: Record<number | string, string> = {
    "0": "bg-red-200 text-red-600 transition-color xl:hover:bg-red-300 xl:hover:text-red-700",
    "1": "bg-blue-200 text-blue-600 transition-color xl:hover:bg-blue-300 xl:hover:text-blue-700",
    "2": "bg-green-200 text-green-600 transition-color xl:hover:bg-green-300 xl:hover:text-green-700",
    "3": "bg-emerald-200 text-emerald-600 transition-color xl:hover:bg-emerald-300 xl:hover:text-emerald-700",
    "4": "bg-teal-200 text-teal-600 transition-color xl:hover:bg-teal-300 xl:hover:text-teal-700",
    "5": "bg-cyan-200 text-cyan-600 transition-color xl:hover:bg-cyan-300 xl:hover:text-cyan-700",
    "6": "bg-sky-200 text-sky-600 transition-color xl:hover:bg-sky-300 xl:hover:text-sky-700",
    "7": "bg-orange-200 text-orange-600 transition-color xl:hover:bg-orange-300 xl:hover:text-orange-700",
    "8": "bg-amber-200 text-amber-600 transition-color xl:hover:bg-amber-300 xl:hover:text-amber-700",
    "9": "bg-yellow-200 text-yellow-600 transition-color xl:hover:bg-yellow-300 xl:hover:text-yellow-700",
    "10": "bg-lime-200 text-lime-600 transition-color xl:hover:bg-lime-300 xl:hover:text-lime-700",
    "11": "bg-indigo-200 text-indigo-600 transition-color xl:hover:bg-indigo-300 xl:hover:text-indigo-700",
    "12": "bg-violet-200 text-violet-600 transition-color xl:hover:bg-violet-300 xl:hover:text-violet-700",
    "13": "bg-purple-200 text-purple-600 transition-color xl:hover:bg-purple-300 xl:hover:text-purple-700",
    "14": "bg-fuchsia-200 text-fuchsia-600 transition-color xl:hover:bg-fuchsia-300 xl:hover:text-fuchsia-700",
    "15": "bg-pink-200 text-pink-600 transition-color xl:hover:bg-pink-300 xl:hover:text-pink-700",
    "16": "bg-rose-200 text-rose-600 transition-color xl:hover:bg-rose-300 xl:hover:text-rose-700",
};
