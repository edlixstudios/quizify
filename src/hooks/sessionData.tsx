import { useSession } from "next-auth/react";

export const useGetSessionId = (): string => {
    const session = useSession();

    if (session.status === "authenticated") {
        return (session.data.user as { id: string }).id as string;
    } else {
        return "default";
    }
};
