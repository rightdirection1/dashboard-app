import prisma from "../../../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  id = id as string;

  if (req.method === "PUT") {
    const { title, color, url } = req.body;

    try {
      const updatedDashboard = await prisma.dashboard.update({
        where: { id: id },
        data: { title, color, url },
      });
      res.status(200).json(updatedDashboard);
    } catch (error) {
      console.error("Error updating dashboard:", error);
      res.status(500).json({ error: "Failed to update dashboard" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
