const User = require("../models/User");

const userController = {
  //Get all users
  getAllUsers: async (req, res) => {
    try{
      const users = await User.find();
      res.status(200).json(users);
    }
    catch(err){
      res.status(500).json({ message: err.message });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try{
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.deleteOne();
      res.status(200).json({ message: "User deleted" });
    }
    catch(err){
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController