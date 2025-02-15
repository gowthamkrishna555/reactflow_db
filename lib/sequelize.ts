import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "reactflow_db", // Database name
  "nextjs_user", // Database user
  "Password@123", // Database password
  {
    host: "localhost", // Change if your database is on another server
    dialect: "postgres", // Specify PostgreSQL
    logging: true, // Set to true for debugging queries
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully!");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    process.exit(1);
  }
};
