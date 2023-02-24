import { useLoca } from "@/hooks/loca";
import { CreateNewTemplate, TemplatePicker } from "@/components/templateCards";
import useSWR from "swr";
import { useTemplates } from "@/store/templates";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AppRoot() {
    const loca = useLoca();
    const templates = useTemplates((state) => state.templates);
    const getAllTemplates = useTemplates((state) => state.getAllTemplates);

    const { isLoading } = useSWR("templates", async () => {
        await getAllTemplates();
    });

    if (isLoading)
        return (
            <div
                className={
                    "w-screen h-screen fixed top-0 left-0 flex justify-center items-center text-7xl"
                }
            >
                <AiOutlineLoading3Quarters className={"animate-spin text-sky-500"} />
            </div>
        );

    return (
        <div className={"p-16 h-screen grid grid-rows-3 text-slate-900"}>
            <div className={" font-bold text-center text-4xl xl:text-6xl"}>
                {loca.localization.templateDashboard.title[loca.language]}
            </div>
            <div
                className={
                    "row-span-2 m-auto gap-8 flex flex-col xl:items-center xl:flex-row xl:flex-wrap"
                }
            >
                <CreateNewTemplate />
                {templates?.map((e) => (
                    <TemplatePicker key={e.id} title={e.title} id={e.id} />
                ))}
            </div>
        </div>
    );
}
