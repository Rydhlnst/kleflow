import {betterAuth} from "better-auth"
import {prismaAdapter} from "better-auth/adapters/prisma"
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import prisma from "./db"
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "d6c24627-c98c-40a0-a595-282f3ab09af3",
                            slug: "kleflow-premium"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ]
        })
    ]
})