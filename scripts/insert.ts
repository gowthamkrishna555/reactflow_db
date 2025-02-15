import { default as NodeModel } from "../models/Node"; // Alias

async function main() {
  await NodeModel.create({
    id: "test-node-1",
    label: "Test Node",
    position_x: 100,
    position_y: 200,
    color: "#ff0000",
  });

  console.log("Node inserted!");
}

main().catch(console.error);
