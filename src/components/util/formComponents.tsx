import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  forwardRef,
  LegacyRef,
} from "react";

interface CustomInput extends ComponentPropsWithRef<"input"> {
  label?: string;
}

export const Input = forwardRef(InputLayout);

function InputLayout(props: CustomInput, ref: LegacyRef<HTMLInputElement>) {
  if (props.label) {
    return (
      <div className={`flex flex-col w-full  ${props.className}`}>
        <label
          className={
            "indent-2 capitalize font-inter text-slate-600 text-sm md:text-xl"
          }
        >
          {props.label}
        </label>
        <input
          ref={ref}
          className={`p-2 rounded-md border-2 border-slate-300 text-base focus:outline-none focus:border-sky-600 md:text-xl  `}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={`p-2 rounded-md border-2 border-slate-300 text-base focus:outline-none focus:border-sky-600 md:text-xl`}
      {...props}
    />
  );
}

interface CustomButton extends ComponentPropsWithoutRef<"button"> {}

export function Button({ ...props }: CustomButton) {
  return (
    <button
      {...props}
      className={`p-2 font-bold rounded-md transition-all ${props.className} disabled:bg-slate-300 disabled:text-slate-500 xl:hover:disabled:bg-slate-400`}
    >
      {props.children}
    </button>
  );
}
