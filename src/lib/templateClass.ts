import { v4 as uuidv4 } from "uuid";

export interface Template {
    id: string;
    title: string;
    finish: boolean;
    template: {};
}

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

    public generateTemplate(): Template {
        return {
            id: this.uuid,
            title: this.templateName,
            finish: false,
            template: {},
        };
    }
}
