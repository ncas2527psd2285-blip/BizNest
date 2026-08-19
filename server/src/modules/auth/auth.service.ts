import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../users/user.model.js";
import { Business } from "../businesses/business.model.js";

import {
  LoginInput,
  RegisterInput,
} from "./auth.types.js";

const generateToken = (
  userId: string,
  businessId: string,
  role: string
): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      userId,
      businessId,
      role,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
};

export const register = async (
  input: RegisterInput
) => {
  const {
    name,
    email,
    password,
    businessName,
    businessType,
  } = input;

  const normalizedEmail =
    email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error(
      "Email is already registered"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 12);

  const business = await Business.create({
    name: businessName,
    type: businessType,
  });

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    businessId: business._id,
    role: "OWNER",
  });

  const token = generateToken(
    user._id.toString(),
    business._id.toString(),
    user.role
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      businessId: user.businessId,
    },
    business: {
      id: business._id,
      name: business.name,
      type: business.type,
    },
  };
};

export const login = async (
  input: LoginInput
) => {
  const {
    email,
    password,
  } = input;

  const normalizedEmail =
    email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password"
    );
  }

  const business =
    await Business.findById(
      user.businessId
    );

  if (!business) {
    throw new Error(
      "Business not found"
    );
  }

  const token = generateToken(
    user._id.toString(),
    user.businessId.toString(),
    user.role
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      businessId: user.businessId,
    },
    business: {
      id: business._id,
      name: business.name,
      type: business.type,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Development Password Reset
|--------------------------------------------------------------------------
*/

export const resetPassword = async (
  email: string,
  newPassword: string
) => {
  const normalizedEmail =
    email.toLowerCase().trim();

  if (
    !newPassword ||
    newPassword.length < 6
  ) {
    throw new Error(
      "Password must be at least 6 characters"
    );
  }

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      12
    );

  user.password = hashedPassword;

  await user.save();

  return {
    message:
      "Password reset successfully",
  };
};