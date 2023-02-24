import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

interface CustomInput extends ComponentPropsWithRef<"input"> {}

export function Input({ ...props }: CustomInput) {
    return <input className={`p-2 rounded-xl outline outline-sky-500 bg-sky-50`} {...props} />;
}

interface CustomButton extends ComponentPropsWithoutRef<"button"> {}

export function Button({ ...props }: CustomButton) {
    return (
        <button
            {...props}
            className={`p-2 text-sky-50 font-bold rounded-xl transition-all ${props.className} xl:hover:scale-105`}
        >
            {props.children}
        </button>
    );
}
