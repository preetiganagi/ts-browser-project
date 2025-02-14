import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "example_app",
  synchronize: true, 
  logging: true,
  entities: ["src/entity/**/*.ts"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ MySQL Database Connected!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};
