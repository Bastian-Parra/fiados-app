import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "../models/users_model.js";

const Purchase = sequelize.define("Purchase", {
  description: {
    type: DataTypes.TEXT,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Purchase.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: true, // Permitir NULL
  },
  onDelete: "SET NULL", // Establecer en NULL si el usuario es eliminado
  onUpdate: "CASCADE", // Actualizar el userId si el id del usuario cambia
});

export default Purchase