import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize";
import User from "../models/users_model.js"

const Payment = sequelize.define("Payment", {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0.01,
    },
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
});

Payment.belongsTo(User, { foreignKey: "userId", constraints: false });
export default Payment
