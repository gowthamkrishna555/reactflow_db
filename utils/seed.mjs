import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.node.create({
    data: {
      label: "Test Node",
      position_x: 100,
      position_y: 200,
      color: "#ff0000"
    },
  });

  console.log("Node inserted!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
