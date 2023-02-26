import Link from "next/link";
import { useGetSessionId } from "root/hooks/sessionData";

export default function Home() {
    const userId = useGetSessionId();

    return (
        <>
            <div className={"h-screen bg-red-300 flex justify-center items-center"}>
                <Link href={`/app/${userId}`}>Aha</Link>
            </div>
        </>
    );
}
