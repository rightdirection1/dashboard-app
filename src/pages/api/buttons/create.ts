import prisma from "../../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, color, url } = req.body;

    try {
      const newDashboard = await prisma.dashboard.create({
        data: { title, color, url },
      });
      res.status(201).json(newDashboard);
    } catch (error) {
      console.error("Error creating dashboard:", error);
      res.status(500).json({ error: "Failed to create dashboard" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
