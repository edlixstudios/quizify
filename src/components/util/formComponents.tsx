import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

interface CustomInput extends ComponentPropsWithRef<"input"> {
    label?: string;
}

export function Input({ ref, ...props }: CustomInput) {
    if (props.label) {
        return (
            <div className={"flex flex-col"}>
                <label className={"indent-2 capitalize font-inter text-slate-600"}>
                    {props.label}
                </label>
                <input
                    ref={ref}
                    className={`p-2 rounded-md border-2 border-slate-300 focus:outline-none focus:border-sky-600  `}
                    {...props}
                />
            </div>
        );
    }

    return (
        <input
            ref={ref}
            className={`p-2 rounded-md border-2 border-slate-300 focus:outline-none focus:border-sky-600  `}
            {...props}
        />
    );
}

interface CustomButton extends ComponentPropsWithoutRef<"button"> {}

export function Button({ ...props }: CustomButton) {
    return (
        <button {...props} className={`p-2 font-bold rounded-md transition-all ${props.className}`}>
            {props.children}
        </button>
    );
}
