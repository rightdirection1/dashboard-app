import prisma from "../../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const dashboards = await prisma.dashboard.findMany();
    return res.status(200).json(dashboards);
  }
}
