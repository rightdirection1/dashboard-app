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
    return res.status(400).json({ error: "Invalid button ID" });
  }

  if (req.method === "GET") {
    try {
      const button = await prisma.button.findUnique({
        where: { id: id },
      });

      if (!button) {
        return res.status(404).json({ error: "Button not found" });
      }

      res.status(200).json(button);
    } catch (error) {
      console.error("Error fetching button:", error);
      res.status(500).json({ error: "Failed to fetch button" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
