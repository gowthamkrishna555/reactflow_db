import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function testDB() {
  try {
    const nodes = await prisma.node.findMany();
    console.log("Database Query Result:", nodes);
  } catch (error) {
    console.error("Database Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
