import Payment from "../models/payments_model.js";
import Purchase from "../models/purchases_model.js";
import paymentService from "../services/payments_services.js";
import { io } from "../server.js"

const paymentController = {
  async createPayment(req, res) {
    const {userId, amount} = req.body
    const paymentDate = new Date()

    
    try {
      const payment = await paymentService.createPayment(
        userId,
        amount,
        paymentDate,
      );

      io.emit("updatePayment", { payment });

      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getPaymentsByUserId(req, res) {
    try {
      const payments = await paymentService.getAllPayments(req.params.id);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deletePayment(req, res) {
    try {
      const payment = await paymentService.deletePayment(req.params.id);

      io.emit("updatePayment", { payment })
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;
