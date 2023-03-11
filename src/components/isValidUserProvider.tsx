import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FullScreenModalWithLoadingSpinner } from "./shared/modalPortal";

interface IsValidUserProvider {
    children: ReactNode;
}

export default function IsValidUserProvider({ children }: IsValidUserProvider) {
    const router = useRouter();
    const session = useSession();
    const [returnToIndex, setReturnToIndex] = useState<boolean>(false);

    useEffect(() => {
        if (router.query.user !== "local") {
            if (
                !session.data ||
                (session.data?.user as { id: string }).id !== router.query.user ||
                !(session.data?.user as { hasSubscription: boolean }).hasSubscription
            ) {
                if (
                    session.data &&
                    !(session.data?.user as { hasSubscription: boolean }).hasSubscription
                ) {
                    toast.error("User has no Subscription");
                } else {
                    toast.error("No valid User");
                }

                router.push("/");
                setReturnToIndex(true);
            }
        }
    }, []);

    if (returnToIndex) return <FullScreenModalWithLoadingSpinner />;

    return <>{children}</>;
}
