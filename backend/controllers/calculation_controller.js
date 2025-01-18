import Purchase from "../models/purchases_model.js";
import Payment from "../models/payments_model.js";
import { io } from "../server.js";

const calculationController = {
  async getUserBalance(req, res) {
    const userId = req.params.id;

    console.log("User ID recibido:", userId);

    try {
      const purchases = await Purchase.sum("amount", { where: { userId } });
      const payments = await Payment.sum("amount", { where: { userId } });

      const balance = (purchases || 0) - (payments || 0);

      if (balance <= 0) {
        // Crear un registro especial indicando que el balance llegó a cero
        await Payment.create({
          userId,
          amount: 0,
          description: "El balance llegó a cero con este abono.",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Emitir actualizaciones en tiempo real
      io.emit("balanceUpdated", { userId, balance });

      // Consultar el historial actualizado
      const updatedPurchases = await Purchase.findAll({ where: { userId } });
      const updatedPayments = await Payment.findAll({ where: { userId } });

      const history = [
        ...updatedPurchases.map((p) => ({ ...p.toJSON(), type: "purchase" })),
        ...updatedPayments.map((p) => ({ ...p.toJSON(), type: "payment" })),
      ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      io.emit("historyUpdated", { userId, history });

      res.status(200).json({ userId, balance });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting user balance" });
    }
  },

  async getUserHistory(req, res) {
    const userId = req.params.id;
    const { page = 1, limit = 10 } = req.query;

    try {
      const purchases = await Purchase.findAll({
        where: { userId },
        offset: (page - 1) * limit,
        limit,
      });

      const payments = await Payment.findAll({
        where: { userId },
        offset: (page - 1) * limit,
        limit,
      });

      const history = [
        ...purchases.map((p) => ({ ...p.toJSON(), type: "purchase" })),
        ...payments.map((p) => ({ ...p.toJSON(), type: "payment" })),
      ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      io.emit("historyUpdated", { userId, history });

      res.status(200).json({ history, page, limit });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user history" });
    }
  },

  async deleteUserHistory(req, res) {
    try {
      const { userId } = req.params;

      await Purchase.destroy({ where: { userId } });
      await Payment.destroy({ where: { userId } });

      res.status(200).json({ message: "User history deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user history" });
    }
  },
};

export default calculationController;
