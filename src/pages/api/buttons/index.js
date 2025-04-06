import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const buttons = await prisma.button.findMany();
    return res.status(200).json(buttons);
  }
}
