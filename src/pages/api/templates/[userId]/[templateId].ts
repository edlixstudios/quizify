import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getHandler(req, res);
            break;
        case "POST":
            await postHandler(req, res);
            break;
        case "PUT":
            await putHandler(req, res);
            break;
        case "DELETE":
            await deleteHandler(req, res);
            break;
    }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    const { templateId } = req.query as { templateId: string };

    const template = await prisma?.template.delete({
        where: {
            id: templateId,
        },
    });

    res.send({ a: "B" });
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const { templateId } = req.query as { templateId: string };

    const template = await prisma?.template.findUnique({
        where: {
            id: templateId,
        },
    });

    res.send(template);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const { templateId } = req.query as { templateId: string };

    await prisma?.template.update({
        where: {
            id: templateId,
        },
        data: req.body,
    });

    res.send({ A: "B" });
}

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
    const { templateId } = req.query as { templateId: string };

    await prisma?.template.update({
        where: {
            id: templateId,
        },
        data: req.body,
    });

    res.send({ success: true, msg: "Alles gut" });
}
