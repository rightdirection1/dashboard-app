import prisma from "../../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  debugger;
  id = id as string;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid dashboard ID" });
  }

  if (req.method === "GET") {
    try {
      const dashboard = await prisma.dashboard.findUnique({
        where: { id: id },
      });

      if (!dashboard) {
        return res.status(404).json({ error: "Dashboard not found" });
      }

      res.status(200).json(dashboard);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res.status(500).json({ error: "Failed to fetch dashboard" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
