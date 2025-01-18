import Payment from "../models/payments_model.js";

const paymentService = {
  async createPayment(userId, amount, paymentDate) {
    try {
      console.log("userId", userId)
      const payment = await Payment.create({
        userId,
        amount,
        paymentDate,
      });
      return payment;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getPaymentsByUserId(id) {
    try {
      const payments = await Payment.findAll({ where: { id } });
      return payments;
    } catch (error) {
      throw new Error("Error retrieving payments");
    }
  },

  async deletePayment(id) {
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        throw new Error("Payment not found");
      }
      await payment.destroy();
    } catch (error) {
      throw new Error("Error deleting payment");
    }
  },
};

export default paymentService;
