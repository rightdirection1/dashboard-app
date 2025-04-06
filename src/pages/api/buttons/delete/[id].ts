import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;

  if (req.method === "DELETE") {
    try {
      id = id as string;
      // Ensure the ID exists and delete the button
      const deletedDashboard = await prisma.dashboard.delete({
        where: { id: id },
      });

      res
        .status(200)
        .json({ message: "Dashboard deleted successfully", deletedDashboard });
    } catch (error: any) {
      console.error("Error deleting dashbord:", error);

      // Handle specific Prisma errors
      if (error.code === "P2025") {
        // Prisma error code for "Record to delete does not exist"
        return res.status(404).json({ error: "Dashboard not found" });
      }

      res.status(500).json({ error: "Failed to delete dashboard" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
