import { useLoca } from "root/hooks/loca";
import { CreateNewTemplate, TemplatePicker } from "root/components/templateCards";
import { useTemplates } from "root/store/templates";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            userId: ctx.query.user ?? "default",
        },
    };
};

export default function AppRoot({ userId }: { userId: string }) {
    const loca = useLoca();
    const router = useRouter();

    const templates = useTemplates((state) => state.templates);
    const getAllTemplates = useTemplates((state) => state.getAllTemplates);

    const { isLoading } = useSWR("templates", async () => {
        await getAllTemplates(userId);
    });

    if (isLoading) return <LoadingSpinner />;

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
                    <TemplatePicker
                        key={e.id}
                        title={e.title}
                        id={e.id}
                        user={router.query.user as string}
                    />
                ))}
            </div>
        </div>
    );
}
