import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import ProductRouter from './src/routes/ProductRoutes';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/products", ProductRouter);

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DATABASE!);
  } catch(e) {
      console.error(e)
  }
};

export const server = app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  connectDB();
});
