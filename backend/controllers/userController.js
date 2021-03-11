import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Get Auth User and Token
//@route    GET /api/users/login
//@access   Public
const getAuthUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

//@desc     Register new user
//@route    POST /api/users/register
//@access   Public
const postNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    username,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Get user info
//@route    GET /api/users/profile
//@access   Private
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Update user setting
//@route    PUT /api/users/profile/settings
//@access   Private
const putUpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Get all users
//@route    PUT /api/users
//@access   Private/Admin

//@desc     Delete User by ID
//@route    PUT /api/users:id
//@access   Private/Admin

//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private/Admin

export { getAuthUser, postNewUser, putUpdateUser, getUserInfo };
