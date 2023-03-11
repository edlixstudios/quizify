import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const searchActive = await prisma?.payment.findMany({
        where: {
            status: "ACTIVE",
        },
    });

    for (const isActive in searchActive) {
    }

    res.status(200).end("Hello Cron!");
}
