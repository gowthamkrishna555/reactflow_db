import { sequelize } from "../lib/sequelize"; // Import Sequelize instance
import Node from "../models/Node"; // Import Node model
import Edge from "../models/Edge"; // Import Edge model (if exists)

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await Node.sync({ alter: true }); // Sync Node table
    await Edge.sync({ alter: true }); // Sync Edge table (if exists)

    console.log("✅ Tables synced successfully!");
    await sequelize.close();
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
}

syncDatabase();
