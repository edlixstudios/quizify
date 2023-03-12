import { Template } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { TemplateTypes } from "root/lib/templateClass";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getHandler(req, res);
      break;
    case "POST":
      await postHandler(req, res);
      break;
  }
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<Template[]>
) {
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

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage>
) {
  const { userId } = req.query as { userId: string };

  const { id, title, finish, template, type } = req.body as {
    id: string;
    title: string;
    finish: boolean;
    type: TemplateTypes;
    template: {};
  };

  const createNewTemplate = await prisma?.template.create({
    data: {
      id,
      userId,
      title,
      finish,
      template,
      type,
    },
  });

  if (createNewTemplate) {
    res.send({ success: true, msg: "Template Created" });
  } else {
    res.send({ success: false, msg: "Error on creating template" });
  }
}
