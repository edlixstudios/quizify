import { TemplatePicker } from "root/components/templateCards";
import { FullTemplate, TemplateClass } from "root/lib/templateClass";
import localforage from "localforage";
import { create } from "zustand";

interface Template {
    templates: TemplatePicker[];
    createTemplate: (title: string, userId: string) => Promise<void>;
    returnTemplates: () => Promise<TemplatePicker[]>;
    getAllTemplates: (userId: string) => Promise<void>;
    deleteTemplate: (userId: string, templateId: string) => void;
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
    createTemplate: async (title, userId) => {
        const template = new TemplateClass(title);

        if (userId === "local") {
            await localforage.setItem(template.getUuid(), template.generateTemplate());
        } else {
            await fetch(`${location.origin}/api/templates/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(template.generateTemplate()),
            });
        }
    },
    returnTemplates: fetchAllKeys,
    getAllTemplates: async function (userId) {
        let templateData: TemplatePicker[];

        if (userId === "local") {
            templateData = await fetchAllKeys();
        } else {
            templateData = await (await fetch(`${location.origin}/api/templates/${userId}`)).json();
        }

        set((prev) => ({ ...prev, templates: templateData }));
    },
    deleteTemplate: async function (userId, templateId) {
        if (userId === "local") {
            await localforage.removeItem(templateId);
        } else {
            await (
                await fetch(`${location.origin}/api/templates/${userId}/${templateId}`, {
                    method: "DELETE",
                })
            ).json();
        }
    },
}));

interface ActiveTemplate {
    activeTemplate: FullTemplate | null;
    fetchActiveTemplate: (userId: string, templateId: string) => void;
    setActiveTemplate: (template: FullTemplate) => void;
}

export const useActiveTemplate = create<ActiveTemplate>((set) => ({
    activeTemplate: null,
    fetchActiveTemplate: async function (userId, templateId) {
        let fetchedTemplate: FullTemplate;
        if (userId === "local") {
            fetchedTemplate = (await localforage.getItem(templateId)) as FullTemplate;
        } else {
            fetchedTemplate = (await (
                await fetch(`${location.origin}/api/templates/${userId}/${templateId}`)
            ).json()) as FullTemplate;
        }
        set((prev) => ({ ...prev, activeTemplate: fetchedTemplate }));
    },
    setActiveTemplate: async function (template) {
        if (!template.userId || template.userId === "local") {
            await localforage.setItem(template.id, template);
        } else {
            const response = await (
                await fetch(`${location.origin}/api/templates/${template.userId}/${template.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(template),
                })
            ).json();
        }

        set((prev) => ({ ...prev, activeTemplate: template }));
    },
}));
