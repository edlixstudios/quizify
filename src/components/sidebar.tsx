import { motion } from "framer-motion";

interface Sidebar {
    closeSidebar: () => void;
}

export default function Sidebar({ closeSidebar }: Sidebar) {
    function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).id === "container") {
            closeSidebar();
        }
    }

    return (
        <aside id={"container"} onClick={handleOnClick} className={"fixed top-0 w-screen h-screen"}>
            <motion.div
                transition={{ ease: "easeOut" }}
                initial={{ x: -screen.width / 4 }}
                animate={{ x: 0 }}
                className={"bg-slate-50 w-1/4 h-screen p-4 drop-shadow-lg"}
            >
                Aside
            </motion.div>
        </aside>
    );
}
