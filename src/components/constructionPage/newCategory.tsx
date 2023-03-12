import React, { useRef, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MAIN_GRADIENT, MAIN_GRADIENT_HOVER } from "../shared/gradient";
import { Button, Input } from "../util/formComponents";
import { CategoryClass } from "root/lib/templateClass";
import { useActiveTemplate } from "root/store/templates";
import Image from "next/image";

export default function NewCategory() {
  const activeTemplate = useActiveTemplate((state) => state.activeTemplate);
  const setActiveTemplate = useActiveTemplate(
    (state) => state.setActiveTemplate
  );
  const [categoryName, setCategoryName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!activeTemplate || !categoryName) return;

    // TODO: Add Image
    const category = new CategoryClass(activeTemplate, categoryName, "");
    const newTemplate = category.getCategory();
    setActiveTemplate({ ...newTemplate });

    setCategoryName("");
  }

  return (
    <form className={"flex justify-center gap-8"} onSubmit={handleOnSubmit}>
      <Input
        ref={inputRef}
        required
        type={"text"}
        value={categoryName}
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
      />
      <Button
        className={`bg-gradient-to-r ${MAIN_GRADIENT} text-sky-50 transition-all ${MAIN_GRADIENT_HOVER} md:hover:drop-shadow-md`}
      >
        <AiOutlineAppstoreAdd className={"w-8 h-8"} />
      </Button>
    </form>
  );
}

interface Category {
  title: string;
}
export const Category = ({ title }: Category) => {
  return (
    <button
      className={`rounded-md bg-slate-300 transition-all md:hover:shadow-xl md:hover:-translate-y-1`}
    >
      <div
        className={`text-xl p-4 rounded-t-md text-sky-50 bg-gradient-to-b ${MAIN_GRADIENT} `}
      >
        {title}
      </div>
      <Image
        className={"rounded-b-md"}
        src={"https://picsum.photos/200"}
        width={500}
        height={500}
        alt={"img"}
      />
    </button>
  );
};
