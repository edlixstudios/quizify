namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string;
        GITHUB_ID: string;
        GITHUB_SECRET: string;
        DISCORD_ID: string;
        DISCORD_SECRET: string;
        PAYPAL_SANDBOX_SELLER_ACCOUNT: string;
        PAYPAL_SANDBOX_SELLER_PW: string;
        PAYPAL_SANDBOX_BUYER_ACCOUNT: string;
        PAYPAL_SANDBOX_BUYER_PW: string;
        PAYPAL_CLIENT_ID: string;
        PAYPAL_SECRET: string;
        LEMON_SQUEEZY_API_KEY: string;
        DATABASE_URL: string;
    }
}
