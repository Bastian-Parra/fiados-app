import userController from "../controllers/users_controller.js"
import calculationController from "../controllers/calculation_controller.js"
import express from "express"

const router = express.Router()

router.post("/create", userController.createUser)
router.get("/getAllUsers", userController.getUsers)
router.get("/getById/:id", userController.getUserById)
router.put("/update/:id", userController.updateUser)
router.delete("/delete/:id", userController.deleteUser)
router.get("/balance/:id", calculationController.getUserBalance)
router.get("/history/:id", calculationController.getUserHistory)
router.delete("/history-delete/:id", calculationController.deleteUserHistory)

export default router