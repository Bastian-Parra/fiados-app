import User from "../models/users_model.js";

const userService = {

  async createUser(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  },

  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw new Error("Error getting all users");
    }
  },

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("Error getting user by ID");
    }
  },

  async updateUser(id, updatedUser) {
    try {
      const user = await this.getUserById(id);
      await user.update(updatedUser);
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user");
    }
  },

  async deleteUser(id) {
    try {
      const user = await this.getUserById(id);
      await user.destroy();
    } catch (error) {
      console.error("Error deleting user by ID:", error);
      throw new Error("Error deleting user by ID");
    }
  }
}

export default userService