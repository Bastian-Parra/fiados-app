import paymentController from "../controllers/payments_controller.js"
import express from "express"

const router = express.Router()

router.post("/create", paymentController.createPayment)
router.get("/getAll", paymentController.getPaymentsByUserId)
router.delete("/delete/:id", paymentController.deletePayment)

export default router