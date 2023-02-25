import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const session = useSession();
    const userId = (session.data?.user as { id: string })?.id ?? "default";

    return (
        <>
            <div className={"h-screen bg-red-300 flex justify-center items-center"}>
                <Link href={`/app/${userId}`}>Aha</Link>
            </div>
        </>
    );
}
