import { ReactNode } from "react";

interface LandingPageSection {
    children: ReactNode;
    variant: "light" | "dark";
}

export default function LandingPageSection({ children, variant }: LandingPageSection) {
    return (
        <section
            className={` text-2xl  ${
                variant === "light" ? "bg-white text-slate-900" : "bg-slate-800 text-slate-50"
            } xl:px-64 md:py-24 md:text-3xl `}
        >
            {children}
        </section>
    );
}
