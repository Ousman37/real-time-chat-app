import { Router } from "express";
import { check } from "express-validator";
import {
  register,
  login,
  getAuthUser,
  updateUser,
  deleteUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get("/user", authMiddleware, getAuthUser);

// @route   PUT api/auth/user
// @desc    Update user profile
// @access  Private
router.put(
  "/user",
  authMiddleware,
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],
  updateUser
);

// @route   DELETE api/auth/user
// @desc    Delete user profile
// @access  Private
router.delete("/user", authMiddleware, deleteUser);

export default router;
