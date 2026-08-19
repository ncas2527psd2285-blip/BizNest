import type {
  Request,
  Response,
} from "express";

import {
  login,
  register,
  resetPassword,
} from "./auth.service.js";

export const registerController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result =
        await register(req.body);

      res.status(201).json({
        success: true,
        message:
          "Registration successful",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed",
      });
    }
  };

export const loginController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result =
        await login(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    }
  };

export const resetPasswordController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {
        email,
        newPassword,
      } = req.body;

      if (!email || !newPassword) {
        res.status(400).json({
          success: false,
          message:
            "Email and new password are required",
        });
        return;
      }

      const result =
        await resetPassword(
          email,
          newPassword
        );

      res.status(200).json({
        success: true,
        message:
          result.message,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Password reset failed",
      });
    }
  };