import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalPortal {
    children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortal) {
    return ReactDOM.createPortal(children, document.getElementById("modal") as HTMLDivElement);
}
