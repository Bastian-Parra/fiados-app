import purchaseController from "../controllers/purchases_controller.js"
import express from "express"

const router = express.Router()

router.post("/create", purchaseController.createPurchase)
router.get("/getAll", purchaseController.getPurchasesByUser)
router.delete("/delete/:id", purchaseController.deletePurchase)

export default router