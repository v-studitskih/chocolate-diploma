import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();


orderRouter.post("/place", authUser, placeOrder);
orderRouter.get("/userorders", authUser, userOrders);  


orderRouter.get("/list", adminAuth, allOrders);
orderRouter.patch("/:orderId/status", adminAuth, updateStatus); 

export default orderRouter;