import { v4 as uuidv4 } from "uuid";

export interface FullTemplate {
  id: string;
  title: string;
  finish: boolean;
  userId: string;
  template: SingleCategoryQuiz | MultipleCategoriesQuiz;
  type: TemplateTypes;
}

export type SingleCategoryQuiz = Omit<Category, "image" | "name">;

export type MultipleCategoriesQuiz = {
  categories: Record<string, Category>;
};

type Category = {
  name: string;
  image: string;
  questions: Question[];
};

export type Question = {
  question: string;
  possibleAnswers: string[];
  media?: string;
  correctAnswer: string | number;
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
      template: {
        questions: [],
      },
    };
  }
}

export class CategoryClass {
  constructor(
    public fullTemplate: FullTemplate,
    categoryName: string,
    image: string
  ) {
    (fullTemplate.template as MultipleCategoriesQuiz).categories[categoryName] =
      { name: categoryName, image, questions: [] };
  }

  public getCategory(): FullTemplate {
    return this.fullTemplate;
  }
}
