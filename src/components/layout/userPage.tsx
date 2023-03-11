import { ReactNode } from "react";
import { UserPageSidebar } from "../sidebar";

interface UserPageLayout {
    children?: ReactNode;
}

export default function UserPageLayout({ children }: UserPageLayout) {
    return (
        <div className={"flex"}>
            <UserPageSidebar />
            <div className={"container mx-auto p-16"}>{children}</div>
        </div>
    );
}
