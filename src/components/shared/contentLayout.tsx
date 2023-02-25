import { ReactNode } from "react";

interface ContentLayout {
    children: ReactNode;
}

export default function ContentLayout({ children }: ContentLayout) {
    return (
        <div className={"p-8"}>
            <div className={" container mx-auto"}>{children}</div>
        </div>
    );
}
