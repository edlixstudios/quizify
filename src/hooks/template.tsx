import { FullTemplate } from "root/lib/templateClass";
import localforage from "localforage";
import useSWR from "swr";

export const useTemplateFetch = (userId: string, templateId: string) => {
    const { data, isLoading } = useSWR(`/fetchTemplate/${userId}/${templateId}`, async () => {
        let template;

        if (userId === "local") {
            template = (await localforage.getItem(templateId)) as FullTemplate;
        } else {
            template = await (
                await fetch(`${location.origin}/api/templates/${userId}/${templateId}`)
            ).json();
        }

        return template as FullTemplate;
    });

    if (isLoading) return null;

    return data;
};
