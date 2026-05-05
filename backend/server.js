import express from "express";
import cors from "cors";
import "dotenv/config";
import path from 'path'
import { fileURLToPath } from "url";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import combinationRouter from "./routes/combinationRouter.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// api endpoints

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use("/api/combinations", combinationRouter);


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
