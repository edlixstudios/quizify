import { useLoca } from "root/hooks/loca";
import { CreateNewTemplate, TemplatePicker } from "root/components/templateCards";
import { useTemplates } from "root/store/templates";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingSpinner from "root/components/util/loadingSpinner";
import { GetServerSideProps } from "next";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import IsValidUserProvider from "root/components/isValidUserProvider";

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

    const { isLoading } = useSWR(`templates/${userId}`, async () => {
        await getAllTemplates(userId);
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <IsValidUserProvider>
            <div className={"p-16 h-screen grid grid-rows-3 text-slate-800"}>
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
                <div className={"fixed bottom-10 right-10"}>
                    <button
                        onClick={async () => {
                            if (userId !== "default") {
                                await signOut({ redirect: false });
                            }
                            router.push("/");
                        }}
                        className={
                            "flex items-center gap-4 p-2 bg-rose-300 rounded-md text-rose-900 xl:hover:bg-rose-400"
                        }
                    >
                        <p className={"font-bold"}>Logout</p>
                        <BiLogOut />
                    </button>
                </div>
            </div>
        </IsValidUserProvider>
    );
}
