import Purchase from "../models/purchases_model.js";

const purchaseService = {
  async createPurchase(userId, description, amount, purchaseDate) {
    try {
      const purchase = await Purchase.create({
        userId, 
        description,
        amount,
        purchaseDate,
      });
      return purchase;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getPurchasesByUserId(id) {
    try {
      const purchases = await Purchase.findAll({ where: { id } });
      return purchases;
    } catch (error) {
      throw new Error("Error fetching purchases");
    }
  },

  async deletePurchase(id) {
    try {
      const purchase = await this.getPurchaseById(id);
      await purchase.destroy();
    } catch (error) {
      throw new Error("Error deleting purchase by ID");
    }
  },
};

export default purchaseService;
