import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { label } = req.body;

      const updatedNode = await prisma.node.update({
        where: { id: Number(id) }, 
        data: { label },
      });

      return res.status(200).json(updatedNode);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
