import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  RegisterRequestBody,
  LoginRequestBody,
  AuthenticatedRequest,
} from "../types/types";

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error("JWT Signing Error:", err); // Add this for debugging
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Register Error:", err); // Add this for debugging
    res.status(500).send("Server error");
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error("JWT Signing Error:", err); // Add this for debugging
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Login Error:", err); // Add this for debugging
    res.status(500).send("Server error");
  }
};

export const getAuthUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Get Auth User Error:", err); // Add this for debugging
    res.status(500).send("Server error");
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { username, email } = req.body;
  try {
    let user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).send("Server error");
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne(); // Use deleteOne instead of remove

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).send("Server error");
  }
};