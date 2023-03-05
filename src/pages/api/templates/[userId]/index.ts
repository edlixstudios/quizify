import { Template } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getHandler(req, res);
            break;
        case "POST":
            await postHandler(req, res);
            break;
    }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<Template[]>) {
    const { userId } = req.query as { userId: string };

    const templates = await prisma?.template.findMany({
        where: {
            userId,
        },
    });

    res.send(templates!);
}

interface ResponseMessage {
    success: boolean;
    msg: string;
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<ResponseMessage>) {
    const { userId } = req.query as { userId: string };

    const { id, title, finish, template } = req.body as {
        id: string;
        title: string;
        finish: boolean;
        template: {};
    };

    const createNewTemplate = await prisma?.template.create({
        data: {
            id,
            userId,
            title,
            finish,
            template,
        },
    });

    if (createNewTemplate) {
        res.send({ success: true, msg: "Tempalte Created" });
    } else {
        res.send({ success: false, msg: "Error on creating template" });
    }
}
