import { motion } from "framer-motion";
import { useLoca } from "root/hooks/loca";
import { AiFillStepBackward, AiFillDelete } from "react-icons/ai";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    MdQuiz,
    MdDashboardCustomize,
    MdDoneAll,
    MdOutlineRemoveDone,
    MdSpaceDashboard,
} from "react-icons/md";
import { useActiveTemplate, useTemplates } from "root/store/templates";
import { signOut, useSession } from "next-auth/react";
import { MAIN_GRADIENT } from "./shared/gradient";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsFillCollectionFill } from "react-icons/bs";

interface AppSidebar {
    closeSidebar: () => void;
}

export default function AppSidebar({ closeSidebar }: AppSidebar) {
    const loca = useLoca();
    const [animationPosition, setAnimationPosition] = useState<number>(0);
    const offsetPosition = screen.width > 1280 ? -(screen.width / 4) : -screen.width;
    const router = useRouter();

    function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).id === "container") {
            setAnimationPosition(offsetPosition);
        }
    }

    return (
        <aside id={"container"} onClick={handleOnClick} className={"fixed top-0 w-screen h-screen"}>
            <motion.div
                onAnimationComplete={(def) => {
                    const { x } = def as { x: number };

                    if (x <= offsetPosition) {
                        closeSidebar();
                    }
                }}
                transition={{ ease: "easeOut", duration: animationPosition < 0 ? 0.1 : 0.2 }}
                initial={{ x: offsetPosition }}
                animate={{ x: animationPosition }}
                className={"bg-slate-50 h-screen flex flex-col p-4 drop-shadow-lg xl:w-1/4"}
            >
                <div className={"flex p-2 items-center"}>
                    <div className={"text-2xl font-bold flex-grow text-center"}>
                        {loca.localization.constructionPage.sidebar.title[loca.language]}
                    </div>
                    <button
                        className={
                            "p-1 rounded-md transition-all bg-slate-200 drop-shadow-md hover:xl:bg-slate-300 "
                        }
                        onClick={() => setAnimationPosition(offsetPosition)}
                        title={
                            loca.localization.constructionPage.sidebar.backBtnHint[loca.language]
                        }
                    >
                        <AiFillStepBackward className={"text-slate-900"} />
                    </button>
                </div>
                <div className={"p-4 flex flex-col gap-8 flex-grow"}>
                    <ul className={"drop-shadow-md"}>
                        <SidebarButton
                            icon={<MdDashboardCustomize className={"w-full h-full"} />}
                            href={`/app/${router.query.user}/${router.query.id}/construction`}
                        >
                            {loca.localization.constructionPage.sidebar.quizes[loca.language]}
                        </SidebarButton>
                        <SidebarButton
                            icon={<MdQuiz className={"w-full h-full"} />}
                            href={`/app/${router.query.user}/${router.query.id}/construction/question`}
                        >
                            {loca.localization.constructionPage.sidebar.questions[loca.language]}
                        </SidebarButton>
                    </ul>

                    <ul className={"drop-shadow-md"}>
                        <TemplateDoneButton />
                        <DashboardButton />
                    </ul>
                    <ul className={"flex-grow flex flex-col justify-end drop-shadow-md"}>
                        <DeleteTemplate />
                    </ul>
                </div>
            </motion.div>
        </aside>
    );
}

interface SidebarButton {
    href: string;
    children: ReactNode;
    icon?: ReactNode;
}

export function SidebarButton({ href, children, icon = undefined }: SidebarButton) {
    const router = useRouter();
    const isPath = router.asPath === href;

    return (
        <li
            className={` font-bold p-2 rounded-md group transition-colors ${
                isPath ? "bg-slate-200 text-slate-900 " : "text-slate-500"
            } xl:hover:bg-slate-300 xl:hover:text-slate-900 xl:hover:drop-shadow-md `}
        >
            <Link className={"flex items-center"} href={href}>
                <div className={"flex-grow text-center"}>{children}</div>
                <div
                    className={`mr-8 h-6 w-6 transition-colors ${
                        isPath ? "text-slate-900" : "text-slate-500 group-hover:xl:text-slate-900"
                    }  `}
                >
                    {icon}
                </div>
            </Link>
        </li>
    );
}

export function SidebarSignOutButton({
    children,
    icon = undefined,
}: {
    children: ReactNode;
    icon: ReactNode;
}) {
    const router = useRouter();

    async function handleOnClick() {
        await signOut({ redirect: false });
        router.push("/");
    }

    return (
        <li
            className={`font-bold p-2 rounded-md group transition-colors bg-rose-200  text-rose-500 
            xl:hover:bg-rose-300 xl:hover:text-rose-900 xl:hover:drop-shadow-md `}
        >
            <button className={"flex items-center w-full"} onClick={handleOnClick}>
                <div className={"flex-grow text-center"}>{children}</div>
                <div
                    className={`mr-8 h-6 w-6 transition-colors text-rose-500 group-hover:xl:text-rose-900  `}
                >
                    {icon}
                </div>
            </button>
        </li>
    );
}

function TemplateDoneButton() {
    const { localization, language } = useLoca();
    const activeTemplate = useActiveTemplate((state) => state.activeTemplate)!;
    const setActiveTemplate = useActiveTemplate((state) => state.setActiveTemplate);

    function toggleMarkedButton() {
        setActiveTemplate({ ...activeTemplate, finish: !activeTemplate.finish });
    }

    return (
        <li
            className={` ${
                activeTemplate?.finish
                    ? "text-rose-900 font-bold p-2 bg-rose-300 rounded-md group transition-colors  xl:hover:bg-rose-400"
                    : "text-emerald-900 font-bold p-2 bg-emerald-300 rounded-md group transition-colors  xl:hover:bg-emerald-400"
            } `}
        >
            <button className={"flex w-full items-center"} onClick={toggleMarkedButton}>
                <div className={"flex-grow text-center"}>
                    {activeTemplate?.finish
                        ? localization.constructionPage.sidebar.isDone[language]
                        : localization.constructionPage.sidebar.isNotDone[language]}
                </div>
                <div className={`mr-8 h-6 w-6 transition-colors   `}>
                    {activeTemplate?.finish ? (
                        <MdOutlineRemoveDone className={"w-full h-full"} />
                    ) : (
                        <MdDoneAll className={"w-full h-full"} />
                    )}
                </div>
            </button>
        </li>
    );
}

function DashboardButton() {
    const router = useRouter();
    const { localization, language } = useLoca();

    return (
        <li
            className={`text-sky-900 font-bold p-2 bg-sky-300 rounded-md group transition-colors  xl:hover:bg-sky-400 `}
        >
            <Link className={"flex items-center"} href={`/app/${router.query.user}/`}>
                <div className={"flex-grow text-center"}>
                    {localization.constructionPage.sidebar.dashboard[language]}
                </div>
                <div className={`mr-8 h-6 w-6 transition-colors   `}>
                    <BsFillCollectionFill className={"w-full h-full"} />
                </div>
            </Link>
        </li>
    );
}

function DeleteTemplate() {
    const router = useRouter();
    const { localization, language } = useLoca();
    const deleteTemplate = useTemplates((state) => state.deleteTemplate);

    async function deleteTemplateHandler() {
        const { user, id: templateId } = router.query as { user: string; id: string };
        await deleteTemplate(user, templateId);
        router.push(`/app/${user}`);
    }

    return (
        <li
            className={`text-rose-900 font-bold p-2 bg-rose-300 rounded-md group transition-colors  xl:hover:bg-rose-400 `}
        >
            <button className={"flex items-center w-full"} onClick={deleteTemplateHandler}>
                <div className={"flex-grow text-center"}>
                    {localization.constructionPage.sidebar.delete[language]}
                </div>
                <div className={`mr-8 h-6 w-6 transition-colors   `}>
                    <AiFillDelete className={"w-full h-full"} />
                </div>
            </button>
        </li>
    );
}

export function UserPageSidebar() {
    const router = useRouter();
    const { localization, language } = useLoca();

    return (
        <aside className={"h-screen min-w-[16rem] shadow-xl"}>
            <div
                className={`font-bold p-8 bg-gradient-to-r text-sky-50 text-center drop-shadow-md ${MAIN_GRADIENT}  text-2xl mx-auto`}
            >
                {localization.app}
            </div>
            <ul className={"p-4"}>
                <SidebarButton
                    href={`/user/${router.query.userid}`}
                    icon={<MdSpaceDashboard className={"h-6 w-6"} />}
                >{`${localization.userPage.dashboard[language]}`}</SidebarButton>
                <SidebarButton
                    href={`/user/${router.query.userid}/account`}
                    icon={<FaUserAlt className={"h-6 w-6"} />}
                >{`${localization.userPage.user[language]}`}</SidebarButton>
                <SidebarSignOutButton
                    icon={<BiLogOut className={"h-6 w-6"} />}
                >{`${localization.userPage.user[language]}`}</SidebarSignOutButton>
            </ul>
        </aside>
    );
}
