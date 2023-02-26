import "root/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
            <Toaster />
        </SessionProvider>
    );
}
