import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    
    const edges = await prisma.edge.findMany();
    return res.status(200).json(edges);
  }

  if (req.method === "POST") {
    
    const { source, target } = req.body;
    const newEdge = await prisma.edge.create({
      data: { source, target },
    });
    return res.status(201).json(newEdge);
  }

  if (req.method === "DELETE") {
    
    const { id } = req.body;
    await prisma.edge.delete({ where: { id } });
    return res.status(200).json({ message: "Edge deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}