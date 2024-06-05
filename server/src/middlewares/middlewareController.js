const jwt = require("jsonwebtoken");

const middlewareController = {
  // Verify token
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token is not valid!" });
        }
        req.user = user;
        next();
      })
    }
    else {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
  },

  // Verify token and admin authorization
  verifyTokenAndAdminAuth:(req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.admin === true || req.user.id == req.params.id) {
        next();
      } else {
        return res.status(403).json({ message: "You are not allowed to do that!" });
      }
    });
  }
};

module.exports = middlewareController;
