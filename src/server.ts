import express from "express";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export { app as default };
