import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner() {
    return (
        <div
            className={
                "w-screen h-screen fixed top-0 left-0 flex justify-center items-center text-7xl"
            }
        >
            <AiOutlineLoading3Quarters className={"animate-spin text-sky-500"} />
        </div>
    );
}
