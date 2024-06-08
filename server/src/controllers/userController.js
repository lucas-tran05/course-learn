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

  // Patch user
  updateUser: async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.stuID = req.body.stuID || user.stuID;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password ? req.body.password : user.password;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.gender = req.body.gender || user.gender;
        user.birthday = req.body.birthday || user.birthday;
        user.major = req.body.major || user.major;
        user.avatar = req.body.avatar || user.avatar;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

};

module.exports = userController