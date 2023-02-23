import { motion } from "framer-motion";
import { useLoca } from "@/hooks/loca";
import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";

export const CreateNewTemplate = () => {
    const loca = useLoca();

    return (
        <motion.button
            className={
                "h-[15rem] bg-slate-100 w-[11rem] rounded-xl shadow-sm transition-all group xl:hover:scale-105 xl:hover:shadow-xl"
            }
        >
            <div className={"h-full p-4 flex flex-col items-center"}>
                <p>{loca.localization.templateDashboard.newTemplate[loca.language]}</p>
                <AiFillFileAdd
                    className={"text-slate-300 w-full flex-grow p-4 group-hover:text-slate-400"}
                />
            </div>
        </motion.button>
    );
};

export interface TemplatePicker {
    title: string;
    id: string;
}
export const TemplatePicker = ({ title, id }: TemplatePicker) => {
    const [randomNumber, _] = useState<number>(
        Math.floor(Math.random() * Object.keys(colorPicker).length)
    );

    console.log("Random", randomNumber);

    return (
        <motion.button
            className={`h-[15rem] w-[11rem] rounded-xl shadow-sm transition-all ${colorPicker[randomNumber]} group xl:hover:scale-105 xl:hover:shadow-xl`}
        >
            <p
                className={
                    "h-full text-2xl font-bold p-4 flex flex-col justify-center items-center"
                }
            >
                {title}
            </p>
        </motion.button>
    );
};

const colorPicker: Record<number | string, string> = {
    "0": "bg-red-200 text-red-600",
    "1": "bg-blue-200 text-blue-600",
    "2": "bg-green-200 text-green-600",
    "3": "bg-emerald-200 text-emerald-600",
    "4": "bg-teal-200 text-teal-600",
    "5": "bg-cyan-200 text-cyan-600",
    "6": "bg-sky-200 text-sky-600",
    "7": "bg-orange-200 text-orange-600",
    "8": "bg-amber-200 text-amber-600",
    "9": "bg-yellow-200 text-yellow-600",
    "10": "bg-lime-200 text-lime-600",
    "11": "bg-indigo-200 text-indigo-600",
    "12": "bg-violet-200 text-violet-600",
    "13": "bg-purple-200 text-purple-600",
    "14": "bg-fuchsia-200 text-fuchsia-600",
    "15": "bg-pink-200 text-pink-600",
    "16": "bg-rose-200 text-rose-600",
};
