import { NextApiRequest, NextApiResponse } from "next";

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

    const makeEntrie = await prisma?.payment.create({
        data: {
            orderId,
            userId,
            planId,
            paymentId,
            status,
            billingTime,
            nextBillingTime,
        },
    });

    res.send({ a: "B" });
}
