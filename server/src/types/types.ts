import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with the actual user type if you have a User interface/model
}

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
