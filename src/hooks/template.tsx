import { Template } from "@/lib/templateClass";
import localforage from "localforage";
import useSWR from "swr";

export const useTemplateFetch = (templateId: string) => {
    const { data, isLoading } = useSWR(`/fetchTemplate/${templateId}`, async () => {
        const template = (await localforage.getItem(templateId)) as Template;

        return template;
    });

    if (isLoading) return null;

    return data;
};
