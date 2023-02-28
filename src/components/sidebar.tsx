import { motion } from "framer-motion";
import { useLoca } from "root/hooks/loca";
import { AiFillStepBackward } from "react-icons/ai";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdQuiz, MdDashboardCustomize } from "react-icons/md";

interface Sidebar {
    closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: Sidebar) {
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
                transition={{ ease: "easeOut" }}
                initial={{ x: offsetPosition }}
                animate={{ x: animationPosition }}
                className={"bg-slate-50 h-screen p-4 drop-shadow-lg xl:w-1/4"}
            >
                <div className={"flex p-2 items-center"}>
                    <div className={"text-2xl font-bold flex-grow text-center"}>
                        {loca.localization.constructionTemplate.sidebar.title[loca.language]}
                    </div>
                    <button
                        className={
                            "p-1 rounded-md transition-all bg-slate-200 hover:xl:bg-slate-300 "
                        }
                        onClick={() => setAnimationPosition(offsetPosition)}
                        title={
                            loca.localization.constructionTemplate.sidebar.backBtnHint[
                                loca.language
                            ]
                        }
                    >
                        <AiFillStepBackward className={"text-slate-900"} />
                    </button>
                </div>
                <ul className={"p-4"}>
                    <SidebarButton
                        icon={<MdDashboardCustomize className={"w-full h-full"} />}
                        href={`/app/${router.query.user}/${router.query.id}/construction`}
                    >
                        {loca.localization.constructionTemplate.sidebar.quizes[loca.language]}
                    </SidebarButton>
                    <SidebarButton
                        icon={<MdQuiz className={"w-full h-full"} />}
                        href={`/app/${router.query.user}/${router.query.id}/construction/question`}
                    >
                        {loca.localization.constructionTemplate.sidebar.questions[loca.language]}
                    </SidebarButton>
                </ul>
            </motion.div>
        </aside>
    );
}

interface SidebarButton {
    href: string;
    children: ReactNode;
    icon?: ReactNode;
}

function SidebarButton({ href, children, icon = null }: SidebarButton) {
    const router = useRouter();
    const active = router.asPath === href;

    return (
        <li
            className={`text-slate-900 font-bold p-2 rounded-md  group transition-colors ${
                active ? "bg-slate-300" : ""
            } xl:hover:bg-slate-200 `}
        >
            <Link className={"flex items-center"} href={href}>
                <div className={"flex-grow text-center"}>{children}</div>
                <div
                    className={`mr-8 h-6 w-6 transition-colors ${
                        active ? "text-slate-900" : "text-slate-500 group-hover:xl:text-slate-900"
                    }  `}
                >
                    {icon}
                </div>
            </Link>
        </li>
    );
}
