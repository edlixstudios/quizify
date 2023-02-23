import { useLoca } from "@/hooks/loca";
import { CreateNewTemplate, TemplatePicker } from "@/components/templateCards";
import localforage from "localforage";
import useSWR from "swr";

export default function AppRoot() {
    const loca = useLoca();

    const { data: templates, isLoading } = useSWR("templates", async () => {
        const allKeys = await localforage.keys();
        const templateData: TemplatePicker[] = [];

        for (let i = 0; i < allKeys.length; i++) {
            const dbData = (await localforage.getItem(allKeys[i])) as TemplatePicker;
            templateData.push(dbData);
        }

        return templateData;
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={"p-16 h-screen grid grid-rows-3 text-slate-900"}>
            <div className={"text-6xl font-bold text-center"}>
                {loca.localization.templateDashboard.title[loca.language]}
            </div>
            <div className={"row-span-2 m-auto flex gap-8"}>
                <CreateNewTemplate />
                {templates?.map((e) => (
                    <TemplatePicker key={e.id} title={e.title} id={e.id} />
                ))}
            </div>
        </div>
    );
}
