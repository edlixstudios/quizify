import { v4 as uuidv4 } from "uuid";

export interface FullTemplate {
    id: string;
    title: string;
    finish: boolean;
    userId?: string;
    template: {};
}

// export interface CloudTemplate extends Omit<Template, "id"> {}

export class TemplateClass {
    private uuid: string = "";

    constructor(public templateName: string) {
        this.generateUuid();
    }

    public getUuid(): string {
        return this.uuid;
    }

    generateUuid(): void {
        this.uuid = uuidv4();
    }

    public generateTemplate(): FullTemplate {
        return {
            id: this.uuid,
            title: this.templateName,
            finish: false,
            template: {},
        };
    }
}
