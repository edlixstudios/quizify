import { ReactNode } from "react";
import ReactDOM from "react-dom";
import LoadingSpinner from "../util/loadingSpinner";

interface ModalPortal {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortal) {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal") as HTMLDivElement
  );
}

interface FullScreenModal {
  children: ReactNode;
  shaded?: boolean;
}

export function FullScreenModal({ children, shaded = false }: FullScreenModal) {
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 overflow-auto ${
        shaded ? "bg-slate-900/25" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function FullScreenModalWithLoadingSpinner() {
  return (
    <ModalPortal>
      <div className={`w-screen h-screen fixed top-0 left-0 bg-white`}>
        <LoadingSpinner />
      </div>
    </ModalPortal>
  );
}
