import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, color, url } = req.body;

    try {
      const updatedButton = await prisma.button.update({
        where: { id: id },
        data: { title, color, url },
      });
      res.status(200).json(updatedButton);
    } catch (error) {
      console.error("Error updating button:", error);
      res.status(500).json({ error: "Failed to update button" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
