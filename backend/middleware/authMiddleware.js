// Bring in jwt, asyncHandler, User model
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // Declare token variable
  let token;

  // req headers auth & auth starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Set token to header auth minus "Bearer"
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      // Find the user by the same id minus the password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(404);
      throw new Error("Not Authorized, Token Failed");
    }

    // If no token, throw error
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No Token`");
    }
  }
});

const admin = (req, res, next) => {
  // If req user isAdmin prop = true, next()
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

export { protect, admin };
