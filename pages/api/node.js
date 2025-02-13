import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === "GET") {
  
    const nodes = await prisma.node.findMany({
      include: { outgoingEdges: true, incomingEdges: true },
    });
    return res.status(200).json(nodes);
  }

  if (req.method === "POST") {
   
    const { label, position_x, position_y, color } = req.body;
    const newNode = await prisma.node.create({
      data: { label, position_x, position_y, color },
    });
    return res.status(201).json(newNode);
  }

  if (req.method === "PUT") {
    
    const { id, label, color } = req.body;
    const updatedNode = await prisma.node.update({
      where: { id },
      data: { label, color },
    });
    return res.status(200).json(updatedNode);
  }

  if (req.method === "DELETE") {
    
    const { id } = req.body;
    await prisma.edge.deleteMany({ where: { OR: [{ source: id }, { target: id }] } });
    await prisma.node.delete({ where: { id } });
    return res.status(200).json({ message: "Node deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}