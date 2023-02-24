import { TemplatePicker } from "@/components/templateCards";
import { TemplateClass } from "@/lib/templateClass";
import localforage from "localforage";
import { create } from "zustand";

interface Template {
    templates: TemplatePicker[];
    createTemplate: (title: string) => Promise<void>;
    returnTemplates: () => Promise<TemplatePicker[]>;
    getAllTemplates: () => Promise<void>;
}

async function fetchAllKeys() {
    const allKeys = await localforage.keys();
    const templateData: TemplatePicker[] = [];

    for (let i = 0; i < allKeys.length; i++) {
        const dbData = (await localforage.getItem(allKeys[i])) as TemplatePicker;
        templateData.push(dbData);
    }

    return templateData;
}

export const useTemplates = create<Template>((set) => ({
    templates: [],
    createTemplate: async (title) => {
        const template = new TemplateClass(title);

        await localforage.setItem(template.getUuid(), template.generateTemplate());
    },
    returnTemplates: fetchAllKeys,
    getAllTemplates: async () => {
        const templateData = await fetchAllKeys();
        set((prev) => ({ ...prev, templates: templateData }));
    },
}));
