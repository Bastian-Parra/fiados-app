import purchaseService from "../services/purchases_services.js";
import { io } from "../server.js"

const purchaseController = {
  async createPurchase(req, res) {
    const {userId, description, amount} = req.body;
    const purchaseDate = new Date()

    try {
      const purchase = await purchaseService.createPurchase(
        userId,
        description,
        amount,
        purchaseDate
      );

      io.emit("updatePurchase", { purchase })

      res.status(201).json(purchase);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getPurchasesByUser(req, res) {
    try {
      const purchases = await purchaseService.getPurchasesByUserId(
        req.params.id
      );
      return purchases;
    } catch (error) {
      throw new Error("Error getting all purchases");
    }
  },

  async deletePurchase(req, res) {
    try {
      const purchase = await purchaseService.deletePurchase(req.params.id);

      io.emit("updatePurchase", { purchaseId: purchase.id })
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default purchaseController;
