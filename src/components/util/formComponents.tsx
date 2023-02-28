import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

interface CustomInput extends ComponentPropsWithRef<"input"> {}

export function Input({ ref, ...props }: CustomInput) {
    return (
        <input
            ref={ref}
            className={`p-2 rounded-md outline outline-sky-500 bg-sky-50`}
            {...props}
        />
    );
}

interface CustomButton extends ComponentPropsWithoutRef<"button"> {}

export function Button({ ...props }: CustomButton) {
    return (
        <button
            {...props}
            className={`p-2 text-sky-50 font-bold rounded-md transition-all ${props.className} xl:hover:scale-105`}
        >
            {props.children}
        </button>
    );
}
