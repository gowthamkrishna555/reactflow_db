import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const newNode = await prisma.node.create({
    data: {
      label: "Direct Node",
      position_x: 50,
      position_y: 80,
      color: "green",
    },
  });

  res.status(201).json(newNode);
}
