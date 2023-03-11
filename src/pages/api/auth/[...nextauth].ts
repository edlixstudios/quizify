import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthData } from "root/components/signin/authForm";
import bcrypt from "bcrypt";

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
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as AuthData;

                const user = await prisma.user.findFirst({
                    where: {
                        email,
                        provider: "credentials",
                    },
                });

                if (user) {
                    const isPasswordValid = await bcrypt.compare(password, user.password!);

                    if (isPasswordValid) return user;
                } else {
                    const hashedPassword = await bcrypt.hash(password, 5);

                    const user = await prisma.user.create({
                        data: {
                            email,
                            password: hashedPassword,
                            provider: "credentials",
                        },
                    });

                    return user;
                }

                return null;
            },
        }),
    ],

    callbacks: {
        async session({ session, user, token }) {
            (session.user as { id: string }).id = token.sub!;

            const userData = await prisma.user.findFirst({
                where: {
                    id: token.sub,
                },
            });
            (session.user as { hasSubscription: boolean }).hasSubscription =
                userData?.hasSubscription!;

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
    },

    pages: {
        signIn: "/signin",
    },
};

export default NextAuth(authOptions);
