import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    callbacks: {
        async session({ session, user, token }) {
            (session.user as { id: string }).id = token.sub!;

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
    },
};

export default NextAuth(authOptions);
