import "root/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import Head from "next/head";
import { useLoca } from "root/hooks/loca";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
    const loca = useLoca();

    return (
        <SessionProvider session={session}>
            <Head>
                <title>{`${loca.localization.app} | Your Quiz Generator |`}</title>
                <link rel={"icon"} href={"/icon.png"} />
            </Head>
            <Component {...pageProps} />
            <Toaster />
        </SessionProvider>
    );
}
