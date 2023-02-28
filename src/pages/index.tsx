import Link from "next/link";
import { useGetSessionId } from "root/hooks/sessionData";
import { LandingPageHeader } from "root/components/shared/header";
import Head from "next/head";

export default function Home() {
  const userId = useGetSessionId();

  return (
    <>
      <LandingPageHeader />
      <div className={"bg-slate-900 h-[25rem] mb-64"} id={"features"}>
        <Link href={`/app/${userId}`}>Aha</Link>
      </div>
      <div className={"bg-slate-900 h-[25rem] mt-64"} id={"prices"}>
        <Link href={`/app/${userId}`}>Aha</Link>
      </div>
    </>
  );
}
