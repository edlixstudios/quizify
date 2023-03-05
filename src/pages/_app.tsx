import "root/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import Head from "next/head";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>Quizify | Your Quiz Generator |</title>
                <link rel={"icon"} href={"/icon.png"} />
            </Head>
            <Component {...pageProps} />
            <Toaster />
        </SessionProvider>
    );
}
