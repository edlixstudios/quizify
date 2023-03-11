import { NextApiRequest, NextApiResponse } from "next";
import { LemonsqueezyClient } from "lemonsqueezy.ts";

const client = new LemonsqueezyClient(process.env.LEMON_SQUEEZY_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            await postHandler(req, res);
            break;
    }
}

interface PaymentBody {
    planId: string;
    orderId: string;
    paymentId: string;
    status: string;
    billingTime: string;
    userId: string;
    nextBillingTime: string;
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, orderId, planId, paymentId, status, billingTime, nextBillingTime } =
        req.body as PaymentBody;

    const make = await client.retrieveProduct({
        id: "Quiz Enthusiast",
    });

    console.log("make", make);

    // const makeEntrie = await prisma?.payment.create({
    //     data: {
    //         orderId,
    //         userId,
    //         planId,
    //         paymentId,
    //         status,
    //         billingTime,
    //         nextBillingTime,
    //     },
    // });

    res.send({ a: "B" });
}
