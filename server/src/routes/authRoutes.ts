import { Router, Request, Response } from "express";
import { check } from "express-validator";
import multer, { StorageEngine } from "multer";
import {
  register,
  login,
  getAuthUser,
  updateUser,
  deleteUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AuthenticatedRequest } from "../types/types";

// Configure multer for file uploads (profile pictures)
const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename for each uploaded file
  },
});

const upload = multer({ storage });

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
router.get("/user", authMiddleware, (req: Request, res: Response) => {
  getAuthUser(req as AuthenticatedRequest, res);
});

// @route   PUT api/auth/user
// @desc    Update user profile
// @access  Private
router.put(
  "/user",
  authMiddleware,
  upload.single("profilePicture"), // Handle profile picture upload
  (req: Request, res: Response) => {
    updateUser(req as AuthenticatedRequest, res);
  }
);

// @route   DELETE api/auth/user
// @desc    Delete user profile
// @access  Private
router.delete("/user", authMiddleware, (req: Request, res: Response) => {
  deleteUser(req as AuthenticatedRequest, res);
});

export default router;