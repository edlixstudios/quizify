import { v4 as uuidv4 } from "uuid";

export interface FullTemplate {
  id: string;
  title: string;
  finish: boolean;
  userId: string;
  template: Template | Category;
  type: TemplateTypes;
}

type Template = Record<string, Category>;

type Category = {
  name: string;
  image?: string;
};

export type TemplateTypes = "singleCategory" | "multipleCategories" | "scored";

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
      type: "singleCategory",
      userId: "local",
      template: {},
    };
  }
}

export class CategoryClass {
  constructor(public fullTemplate: FullTemplate, public categoryName: string) {
    (fullTemplate.template as Template)[categoryName] = {
      name: categoryName,
    };
  }

  public getCategory(): FullTemplate {
    return this.fullTemplate;
  }
}
