import express from "express";
import {
  addCombination,
  listCombinations,
  removeCombination,
  singleCombination,
} from "../controllers/combinationController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const combinationRouter = express.Router();

combinationRouter.get("/list", listCombinations);
combinationRouter.get("/:combinationId", singleCombination);

combinationRouter.post(
  "/add",
  adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  addCombination,
);
combinationRouter.delete("/:combinationId", adminAuth, removeCombination);

export default combinationRouter;
