import React, { useEffect, useRef, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MAIN_GRADIENT, MAIN_GRADIENT_HOVER } from "../shared/gradient";
import { Button, Input } from "../util/formComponents";

export default function NewCategorie() {
    const [categorieName, setCategorieName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function handleSubmitKey(e: KeyboardEvent) {
        if (e.key === "Enter") {
            setCategorieName("");
            inputRef.current?.blur();
        }
    }

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.addEventListener("keydown", handleSubmitKey);
        }
    }, []);

    return (
        <form className={"flex justify-center gap-8"} onSubmit={handleOnSubmit}>
            <Input
                ref={inputRef}
                required
                type={"text"}
                value={categorieName}
                onChange={(e) => {
                    setCategorieName(e.target.value);
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
