import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalPortal {
    children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortal) {
    return ReactDOM.createPortal(children, document.getElementById("modal") as HTMLDivElement);
}

interface FullScreenModal {
    children: ReactNode;
    shaded?: boolean;
}

export function FullScreenModal({ children, shaded = false }: FullScreenModal) {
    return (
        <div className={`w-screen h-screen fixed top-0 left-0 ${shaded ? "bg-slate-900/25" : ""}`}>
            {children}
        </div>
    );
}
