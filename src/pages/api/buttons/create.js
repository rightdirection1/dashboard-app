import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, color, url } = req.body;

    try {
      const newButton = await prisma.button.create({
        data: { title, color, url },
      });
      res.status(201).json(newButton);
    } catch (error) {
      console.error("Error creating button:", error);
      res.status(500).json({ error: "Failed to create button" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
